import prisma from "../../../../../prisma/PrismaClient";
import { OutboxWorker } from "../../../../worker";
import { InMemoryEventBus } from "../../infra/InMemoryEventBus";
import { PrismaDeadLetterRepository } from "../../infra/PrismaDeadLetterRepository";
import { PrismaEventMapper } from "../../infra/PrismaEventMapper";
import { PrismaIdempotenciaRepository } from "../../infra/PrismaIdempotenciaRepository";
import { PrismaOutboxRepository } from "../../infra/PrismaOutboxRepository";
import { FakeAggregate } from "../unidade/aggregateRoot.test";
import { FakeIdentifier } from "../unidade/identifier.test";
import { DomainEvent } from "../../domain/DomainEvent";
import { EventHandler } from "../../application/EventBus";
import { createTestDatabase, type TestDatabase } from "../../infra/PgLitePrisma";
import { afterAll, beforeAll, beforeEach, describe, expect, it } from "vitest";

class FakeHandler implements EventHandler {
    readonly handlerName: string;
    eventosRecebidos: DomainEvent[] = [];
    deveFalhar = false;
    falhasAntesSucesso = 0;
    tentativas = 0;

    constructor(nome = 'FakeHandler') {
        this.handlerName = nome;
    }

    async handle(evento: DomainEvent): Promise<void> {
        this.tentativas++;
        if (this.deveFalhar && this.tentativas <= this.falhasAntesSucesso) {
            throw new Error(`Falha simulada #${this.tentativas}`);
        }
        this.eventosRecebidos.push(evento);
    }

    reset(): void {
        this.eventosRecebidos = [];
        this.tentativas = 0;
    }
}

describe('Integração: Aggregate → Outbox → Worker → EventBus → Handler', () => {
    let testDb: TestDatabase;
    let outboxRepo: PrismaOutboxRepository;
    let idempotenciaRepo: PrismaIdempotenciaRepository;
    let dlqRepo: PrismaDeadLetterRepository

    beforeAll(async () => {
        testDb = await createTestDatabase();

        outboxRepo = new PrismaOutboxRepository(testDb.db);
        idempotenciaRepo = new PrismaIdempotenciaRepository(testDb.db);
        dlqRepo = new PrismaDeadLetterRepository(testDb.db);
    });
    afterAll(async () => {
        await testDb.close();
    });

    beforeEach(async () => {
        await testDb.cleanup();
    });

    async function aguardar(
        condicao: () => Promise<boolean>,
        timeoutMs = 5000,
        intervalMs = 100
    ): Promise<void> {
        const inicio = Date.now();
        while (Date.now() - inicio < timeoutMs) {
            if (await condicao()) return;
            await new Promise(r => setTimeout(r, intervalMs));
        }
        throw new Error(`Timeout após ${timeoutMs}ms`);
    }
    function criarAggregateComEvento(id: string, dados: any): FakeAggregate {
        const aggregate = new FakeAggregate(new FakeIdentifier(id), dados);
        aggregate.adicionarEvento({
            nomeEvento: 'UsuarioCadastrado',
            moduloOrigem: 'User',
            dataOcorrencia: new Date('2026-06-03T10:00:00Z'),
            aggregateId: aggregate.id.valor,
            dados,
        });
        return aggregate;
    }
    async function salvarNoOutbox(aggregate: FakeAggregate): Promise<void> {
        const eventos = aggregate.obterEventos();
        await Promise.all(
            eventos.map(e =>
                testDb.db.outbox.create({
                    data: PrismaEventMapper.toOutbox(e) as any,
                })
            )
        );
    }


    it('deve processar evento do Outbox e entregar ao handler', async () => {
        const aggregate = criarAggregateComEvento('agg-123', {
            nome: 'João',
            email: 'joao@email.com',
        });
        await salvarNoOutbox(aggregate);

        const handler = new FakeHandler();
        const eventBus = new InMemoryEventBus(idempotenciaRepo, dlqRepo, 3);
        eventBus.inscrever('UsuarioCadastrado', handler);

        const worker = new OutboxWorker(outboxRepo, eventBus, 500);
        worker.start();

        await aguardar(() => Promise.resolve(handler.eventosRecebidos.length > 0), 3000);
        //worker.stop?.();

        expect(handler.eventosRecebidos).toHaveLength(1);
        expect(handler.eventosRecebidos[0]!.nomeEvento).toBe('UsuarioCadastrado');
        expect(handler.eventosRecebidos[0]!.dados).toEqual({
            nome: 'João',
            email: 'joao@email.com',
        });

        const outboxRecord = await testDb.db.outbox.findFirst({
            where: { aggregateId: 'agg-123' },
        });
        expect(outboxRecord?.status).toBe('PROCESSED');
        expect(outboxRecord?.processedAt).not.toBeNull();

        const idempotencia = await testDb.db.eventoProcessado.findFirst({
            where: { eventId: outboxRecord!.id, handlerName: 'FakeHandler' },
        });
        expect(idempotencia).not.toBeNull();
    });

    it('deve enviar para DLQ após exceder retries', async () => {
        const aggregate = criarAggregateComEvento('agg-456', { nome: 'Maria' });
        await salvarNoOutbox(aggregate);

        const handler = new FakeHandler();
        handler.deveFalhar = true;
        handler.falhasAntesSucesso = 999;

        const eventBus = new InMemoryEventBus(idempotenciaRepo, dlqRepo, 2);
        eventBus.inscrever('UsuarioCadastrado', handler);

        const worker = new OutboxWorker(outboxRepo, eventBus, 300);
        worker.start();

        await aguardar(async () => (await testDb.db.deadLetter.count()) > 0, 5000);
        //worker.stop?.();

        expect(handler.tentativas).toBe(2);

        const dlqRecord = await testDb.db.deadLetter.findFirst({
            where: { aggregateId: 'agg-456' },
        });
        expect(dlqRecord).not.toBeNull();
        expect(dlqRecord?.retriesTotal).toBe(2);
        expect(dlqRecord?.reprocessado).toBe(false);
    });

    it('não deve reexecutar handler já processado', async () => {
        const aggregate = criarAggregateComEvento('agg-789', { nome: 'Pedro' });
        await salvarNoOutbox(aggregate);

        const handler = new FakeHandler();
        const eventBus = new InMemoryEventBus(idempotenciaRepo, dlqRepo, 3);
        eventBus.inscrever('UsuarioCadastrado', handler);

        const worker = new OutboxWorker(outboxRepo, eventBus, 300);
        worker.start();

        await aguardar(() => Promise.resolve(handler.eventosRecebidos.length > 0), 3000);

        await new Promise(r => setTimeout(r, 800));
        //worker.stop?.();

        expect(handler.eventosRecebidos).toHaveLength(1);
        expect(handler.tentativas).toBe(1);
    });

    it('deve entregar a múltiplos handlers independentemente', async () => {
        const aggregate = criarAggregateComEvento('agg-multi', { nome: 'Ana' });
        await salvarNoOutbox(aggregate);

        const handlerEmail = new FakeHandler('EmailHandler');
        const handlerCache = new FakeHandler('CacheHandler');

        const eventBus = new InMemoryEventBus(idempotenciaRepo, dlqRepo, 3);
        eventBus.inscrever('UsuarioCadastrado', handlerEmail);
        eventBus.inscrever('UsuarioCadastrado', handlerCache);

        const worker = new OutboxWorker(outboxRepo, eventBus, 300);
        worker.start();

        await aguardar(
            () =>
                Promise.resolve(
                    handlerEmail.eventosRecebidos.length > 0 &&
                    handlerCache.eventosRecebidos.length > 0
                ),
            3000
        );
        //worker.stop?.();

        expect(handlerEmail.eventosRecebidos).toHaveLength(1);
        expect(handlerCache.eventosRecebidos).toHaveLength(1);

        const outboxRecord = await testDb.db.outbox.findFirst({
            where: { aggregateId: 'agg-multi' },
        });

        const idemEmail = await testDb.db.eventoProcessado.findFirst({
            where: { eventId: outboxRecord!.id, handlerName: 'EmailHandler' },
        });
        const idemCache = await testDb.db.eventoProcessado.findFirst({
            where: { eventId: outboxRecord!.id, handlerName: 'CacheHandler' },
        });

        expect(idemEmail).not.toBeNull();
        expect(idemCache).not.toBeNull();
    });
});
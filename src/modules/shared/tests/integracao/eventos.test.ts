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

const aggregate = new FakeAggregate(new FakeIdentifier('a'), { nome: 'b' })

aggregate.adicionarEvento({ nomeEvento: 'Evento', moduloOrigem: 'fake', dataOcorrencia: new Date(), aggregateId: aggregate.id.valor, dados: { nome: 'ola' } });

const eventos = aggregate.obterEventos();

//Criar um fake use case e um FakeRepository e salvar evento na tabela outbox

eventos.map(evento =>
    prisma.outbox.create({
        data: PrismaEventMapper.toOutbox(evento)
    })
)

//Instanciar o event bus e inscrever o evento em um FakeHandler

const eventBus = new InMemoryEventBus(new PrismaIdempotenciaRepository, new PrismaDeadLetterRepository, 5)

class FakeHandler implements EventHandler {
    constructor(readonly handlerName: string = 'FakeHandler') { }

    async handle(evento: DomainEvent): Promise<void> {
        //algo pra teste
    }
}

eventBus.inscrever('Evento', new FakeHandler)

//Instanciar o worker e ver a mágica acontecer

const worker = new OutboxWorker(new PrismaOutboxRepository, eventBus)
import { Prisma, PrismaClient } from "../../../generated/prisma/client";
import { OutboxInput, OutboxMessage, OutboxRepository } from "../application/OutboxRepository";

export class PrismaOutboxRepository implements OutboxRepository {
    constructor(private prisma: PrismaClient) { }

    async claimPendentes(limite: number): Promise<OutboxMessage[]> {
        // Usa transação para evitar race condition entre workers
        return this.prisma.$transaction(async (tx) => {
            // Pega os mais antigos que estão PENDING
            const pendentes = await tx.outbox.findMany({
                where: { status: 'PENDING' },
                orderBy: { dataPersistencia: 'asc' },
                take: limite,
            });

            const ids = pendentes.map(p => p.id);
            if (ids.length > 0) {
                await tx.outbox.updateMany({
                    where: { id: { in: ids } },
                    data: { status: 'PROCESSING', lockedAt: new Date() },
                });
            }

            return pendentes.map(p => ({
                id: p.id,
                nomeEvento: p.nomeEvento,
                dataOcorrencia: p.dataOcorrencia,
                aggregateId: p.aggregateId,
                moduloOrigem: p.moduloOrigem,
                dados: (p.dados ?? {}) as Record<string, unknown>,
                status: p.status,
                retries: p.retries,
            }));
        });
    }

    async marcarProcessado(id: string): Promise<void> {
        await this.prisma.outbox.update({
            where: { id },
            data: {
                status: 'PROCESSED',
                processedAt: new Date(),
            },
        });
    }

    async incrementarRetry(id: string, erro: string): Promise<void> {
        await this.prisma.outbox.update({
            where: { id },
            data: {
                status: 'PENDING',        // Volta pra fila
                retries: { increment: 1 },
                error: erro,
                lockedAt: null,           // Libera o lock
            },
        });
    }

    async inserir(mensagem: OutboxInput): Promise<void> {
        await this.prisma.outbox.create({
            data: {
                id: mensagem.id,
                nomeEvento: mensagem.nomeEvento,
                aggregateId: mensagem.aggregateId,
                moduloOrigem: mensagem.moduloOrigem,
                dados: mensagem.dados as unknown as Prisma.InputJsonValue,  // ← CAST AQUI
                dataOcorrencia: mensagem.dataOcorrencia,
                status: 'PENDING',
                retries: 0,
            },
        });
    }
}
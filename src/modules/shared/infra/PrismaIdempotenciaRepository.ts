import { PrismaClient } from "../../../generated/prisma/client";
import { IdempotenciaRepository } from "../application/IdempotenciaRepository";

export class PrismaIdempotenciaRepository implements IdempotenciaRepository {
    constructor(private prisma: PrismaClient) { }

    async existe(chave: string): Promise<boolean> {
        const [eventId, handlerName] = chave.split('::');
        if (!eventId || !handlerName) {
            throw new Error(`Chave inválida: ${chave}`);
        }
        const registro = await this.prisma.eventoProcessado.findUnique({
            where: { eventId_handlerName: { eventId, handlerName } }
        });
        return !!registro;
    }

    async marcar(chave: string): Promise<void> {
        const [eventId, handlerName] = chave.split('::');
        if (!eventId || !handlerName) {
            throw new Error(`Chave inválida: ${chave}`);
        }
        await this.prisma.eventoProcessado.create({
            data: { eventId, handlerName, processedAt: new Date() },
        }).catch(() => {
            // Unique violation — outro worker/processou primeiro. Ignora silenciosamente.
        });
    }

    async deletarAntigos(corte: Date): Promise<{ count: number }> {
        const resultado = await this.prisma.eventoProcessado.deleteMany({
            where: {
                processedAt: {
                    lt: corte,
                },
            },
        });
        return resultado;
    }
}
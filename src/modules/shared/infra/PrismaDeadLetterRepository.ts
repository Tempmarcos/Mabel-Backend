import { DeadLetter, PrismaClient } from "../../../generated/prisma/client";
import { DeadLetterCreateInput } from "../../../generated/prisma/models";
import { DeadLetterRepository } from "../application/DeadLetterRepository";

export class PrismaDeadLetterRepository implements DeadLetterRepository {
    constructor(private prisma: PrismaClient) { }

    async salvar(entry: DeadLetterCreateInput): Promise<void> {
        await this.prisma.deadLetter.create({
            data: {
                ...entry,
                errorHistory: JSON.stringify(entry.errorHistory),
            },
        });
    }

    async listarPendentes(): Promise<DeadLetter[]> {
        return this.prisma.deadLetter.findMany({
            where: { reprocessado: false },
            orderBy: { failedAt: 'asc' },
        });
    }

    async marcarReprocessado(id: string): Promise<void> {
        await this.prisma.deadLetter.update({
            where: { id },
            data: { reprocessado: true, reprocessadoAt: new Date() },
        });
    }
}
import prisma from "../../../../prisma/PrismaClient";
import { DeadLetter } from "../../../generated/prisma/client";
import { DeadLetterCreateInput } from "../../../generated/prisma/models";
import { DeadLetterRepository } from "../application/DeadLetterRepository";

export class PrismaDeadLetterRepository implements DeadLetterRepository {
    async salvar(entry: DeadLetterCreateInput): Promise<void> {
        await prisma.deadLetter.create({
            data: {
                ...entry,
                errorHistory: JSON.stringify(entry.errorHistory),
            },
        });
    }

    async listarPendentes(): Promise<DeadLetter[]> {
        return prisma.deadLetter.findMany({
            where: { reprocessado: false },
            orderBy: { failedAt: 'asc' },
        });
    }

    async marcarReprocessado(id: string): Promise<void> {
        await prisma.deadLetter.update({
            where: { id },
            data: { reprocessado: true, reprocessadoAt: new Date() },
        });
    }
}
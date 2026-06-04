import { Prisma } from "../../../generated/prisma/client";
import { DomainEvent } from "../domain/DomainEvent";

export class PrismaEventMapper {
    static toLog(event: DomainEvent) {
        return {
            nomeEvento: event.nomeEvento,
            aggregateId: event.aggregateId,
            dados: event.dados as Prisma.InputJsonValue,
            dataOcorrencia: event.dataOcorrencia,
            moduloOrigem: event.moduloOrigem
        };
    }

    static toOutbox(event: DomainEvent) {
        return {
            nomeEvento: event.nomeEvento,
            aggregateId: event.aggregateId,
            dados: event.dados as Prisma.InputJsonValue,
            dataOcorrencia: event.dataOcorrencia,
            moduloOrigem: event.moduloOrigem
        };
    }
}
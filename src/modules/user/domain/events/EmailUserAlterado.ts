import { DomainEvent } from "../../../shared/domain/DomainEvent";
import { UserEventType } from "./EventTypes";

export interface EmailUserAlteradoEvent extends DomainEvent {
    nomeEvento: UserEventType.EMAIL_USER_ALTERADO;
    dados: {
        usuarioId: string;
        email: string;
        nome: string;
        emailAntigo: string;
    };
}

export function criarEventoEmailUserAlterado(
    usuarioId: string,
    email: string,
    nome: string,
    emailAntigo: string
): EmailUserAlteradoEvent {
    return {
        nomeEvento: UserEventType.EMAIL_USER_ALTERADO,
        dataOcorrencia: new Date(),
        moduloOrigem: 'USER',
        aggregateId: usuarioId,
        dados: {
            usuarioId,
            email,
            nome,
            emailAntigo
        }
    };
}
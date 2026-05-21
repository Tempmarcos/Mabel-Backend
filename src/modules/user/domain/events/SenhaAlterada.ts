import { DomainEvent } from "../../../shared/domain/DomainEvent";
import { UserEventType } from "./EventTypes";

export interface SenhaAlteradaEvent extends DomainEvent {
    nomeEvento: UserEventType.SENHA_ALTERADA;
    dados: {
        usuarioId: string;
        email: string;
        nome: string;
    };
}

export function criarEventoSenhaAlterada(
    usuarioId: string,
    email: string,
    nome: string,
): SenhaAlteradaEvent {
    return {
        nomeEvento: UserEventType.SENHA_ALTERADA,
        dataOcorrencia: new Date(),
        moduloOrigem: 'USER',
        aggregateId: usuarioId,
        dados: {
            usuarioId,
            email,
            nome
        }
    };
}
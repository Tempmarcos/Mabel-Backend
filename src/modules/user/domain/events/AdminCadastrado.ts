import { DomainEvent } from "../../../shared/domain/DomainEvent";
import { UserEventType } from "./EventTypes";

export interface AdminCadastradoEvent extends DomainEvent {
    nomeEvento: UserEventType.ADMIN_CADASTRADO;
    dados: {
        usuarioId: string;
        email: string;
        nome: string;
    };
}

export function criarEventoAdminCadastrado(
    usuarioId: string,
    email: string,
    nome: string,
): AdminCadastradoEvent {
    return {
        nomeEvento: UserEventType.ADMIN_CADASTRADO,
        dataOcorrencia: new Date(),
        aggregateId: usuarioId,
        dados: {
            usuarioId,
            email,
            nome
        }
    };
}
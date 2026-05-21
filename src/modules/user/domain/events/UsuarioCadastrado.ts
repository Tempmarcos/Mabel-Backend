import { DomainEvent } from "../../../shared/domain/DomainEvent";
import { UserEventType } from "./EventTypes";

export interface UsuarioCadastradoEvent extends DomainEvent {
  nomeEvento: UserEventType.USUARIO_CADASTRADO;
  dados: {
    usuarioId: string;
    email: string;
    nome: string;
  };
}

export function criarEventoUsuarioCadastrado(
  usuarioId: string,
  email: string,
  nome: string,
): UsuarioCadastradoEvent {
  return {
    nomeEvento: UserEventType.USUARIO_CADASTRADO,
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
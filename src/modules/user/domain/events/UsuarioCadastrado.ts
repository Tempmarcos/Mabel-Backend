import { DomainEvent } from "../../../shared/domain/DomainEvent";
import { TipoUsuario } from "../TipoUsuario";
import { UserEventType } from "./EventTypes";

export interface UsuarioCadastradoEvent extends DomainEvent {
  nomeEvento: UserEventType.USUARIO_CADASTRADO;
  dados: {
    usuarioId: string;
    email: string;
    tipo: TipoUsuario;
    nome: string;
  };
}

export function criarEventoUsuarioCadastrado(
  usuarioId: string,
  email: string,
  tipo: TipoUsuario,
  nome: string
): UsuarioCadastradoEvent {
  return {
    nomeEvento: UserEventType.USUARIO_CADASTRADO,
    dataOcorrencia: new Date(),
    aggregateId: usuarioId,
    dados: {
      usuarioId,
      email,
      tipo,
      nome
    }
  };
}
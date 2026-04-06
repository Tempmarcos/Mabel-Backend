import { DomainEvent } from '../../../shared/domain/DomainEvent';
import { UserEventType } from './EventTypes';

export interface UsuarioLogadoEvent extends DomainEvent {
  nomeEvento: UserEventType.USUARIO_LOGADO;
  dados: {
    usuarioId: string;
    email: string;
    dataLogin: Date;
    ipAddress?: string | null;
  };
}

export function criarEventoUsuarioLogado(
  usuarioId: string,
  email: string,
  ipAddress?: string,
): UsuarioLogadoEvent {
  return {
    nomeEvento: UserEventType.USUARIO_LOGADO,
    dataOcorrencia: new Date(),
    aggregateId: usuarioId,
    dados: {
      usuarioId,
      email,
      dataLogin: new Date(),
      ipAddress: ipAddress ?? null,
    }
  };
}
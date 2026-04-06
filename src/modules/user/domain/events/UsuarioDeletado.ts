import { DomainEvent } from '../../../shared/domain/DomainEvent';
import { UserEventType } from './EventTypes';

export interface UsuarioDeletadoEvent extends DomainEvent {
  nomeEvento: UserEventType.USUARIO_DELETADO;
  dados: {
    usuarioId: string;
    email: string;
    dataDelecao: Date;
    deletadoPor?: string | null;
  };
}

export function criarEventoUsuarioDeletado(
  usuarioId: string,
  email: string,
  deletadoPor?: string
): UsuarioDeletadoEvent {
  return {
    nomeEvento: UserEventType.USUARIO_DELETADO,
    dataOcorrencia: new Date(),
    aggregateId: usuarioId,
    dados: {
      usuarioId,
      email,
      dataDelecao: new Date(),
      deletadoPor: deletadoPor ?? null
    }
  };
}
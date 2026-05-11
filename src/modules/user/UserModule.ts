
import { EventLoggerHandler } from '../logging/application/EventLoggerHandler';
import { LogRepository } from '../logging/domain/LogRepository';
import { EventBus } from '../shared/application/EventBus';
import { IdGenerator } from '../shared/application/IdGenerator';
import { UserEventType } from './domain/events/EventTypes';

export class UserModule {
  static inicializar(logRepository: LogRepository, eventBus: EventBus, idGenerator: IdGenerator): void {
    const loggerHandler = new EventLoggerHandler(logRepository, 'User', idGenerator);

    eventBus.inscrever(UserEventType.USUARIO_CADASTRADO, loggerHandler);
    // eventBus.inscrever('UsuarioCadastrado', admHandler);
    // eventBus.inscrever('UsuarioCadastrado', financeiroHandler);
    eventBus.inscrever(UserEventType.USUARIO_LOGADO, loggerHandler);
    eventBus.inscrever(UserEventType.USUARIO_DELETADO, loggerHandler);
  }
}
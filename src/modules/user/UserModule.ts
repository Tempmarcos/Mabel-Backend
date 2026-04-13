
import { EventLoggerHandler } from '../logging/application/EventLoggerHandler';
import { LogRepository } from '../logging/domain/LogRepository';
import { EventBus } from '../shared/application/EventBus';
import { IdGenerator } from '../shared/application/IdGenerator';

export class UserModule {
  static inicializar(logRepository: LogRepository, eventBus: EventBus, idGenerator: IdGenerator): void {
    const loggerHandler = new EventLoggerHandler(logRepository, 'Users', idGenerator);

    eventBus.inscrever('UsuarioCadastrado', loggerHandler);
    // eventBus.inscrever('UsuarioCadastrado', admHandler);
    // eventBus.inscrever('UsuarioCadastrado', financeiroHandler);
    eventBus.inscrever('UsuarioLogado', loggerHandler);
    eventBus.inscrever('UsuarioDeletado', loggerHandler);
  }
}
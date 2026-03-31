import { EventLoggerHandler } from '../logging/application/handlers/EventLoggerHandler';
import { PrismaLogRepository } from '../logging/infra/persistence/PrismaLogRepository';
import { EventBus } from '../shared/application/EventBus';

export class UserModule {
  static inicializar(eventBus: EventBus): void {
    const logRepository = new PrismaLogRepository();
    const loggerHandler = new EventLoggerHandler(logRepository, 'Users');

    eventBus.inscrever('UsuarioCadastrado', loggerHandler);
    // eventBus.inscrever('UsuarioCadastrado', admHandler);
    // eventBus.inscrever('UsuarioCadastrado', financeiroHandler);
    eventBus.inscrever('UsuarioLogado', loggerHandler);
    eventBus.inscrever('UsuarioDeletado', loggerHandler);
  }
}
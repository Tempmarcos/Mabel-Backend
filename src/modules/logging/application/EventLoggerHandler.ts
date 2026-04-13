import { EventHandler } from "../../shared/application/EventBus";
import { IdGenerator } from "../../shared/application/IdGenerator";
import { DomainEvent } from "../../shared/domain/DomainEvent";
import { LogEvento, LogId } from "../domain/LogEvento";
import { LogRepository } from "../domain/LogRepository";

export class EventLoggerHandler implements EventHandler {
  constructor(
    private logRepository: LogRepository,
    private moduloOrigem: string,
    private idGenerator: IdGenerator
  ) { }

  async handle(evento: DomainEvent): Promise<void> {
    const log = LogEvento.criar(
      new LogId(this.idGenerator.generate()),
      evento.nomeEvento,
      evento.dataOcorrencia,
      evento.aggregateId,
      evento.dados,
      this.moduloOrigem
    );

    await this.logRepository.salvar(log);
    console.log(`[LOG] Evento ${evento.nomeEvento} persistido para ${this.moduloOrigem}`);
  }
}
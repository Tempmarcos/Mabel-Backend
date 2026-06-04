import { DeadLetterRepository } from "../application/DeadLetterRepository";
import { EventBus, EventHandler } from "../application/EventBus";
import { IdempotenciaRepository } from "../application/IdempotenciaRepository";
import { DomainEvent } from "../domain/DomainEvent";


export class InMemoryEventBus implements EventBus {
  private handlers = new Map<string, EventHandler[]>();

  constructor(
    private idempotenciaRepo: IdempotenciaRepository,
    private dlqRepo: DeadLetterRepository,
    private maxRetries = 5
  ) { }

  async publicar(evento: DomainEvent): Promise<void> {
    const handlers = this.handlers.get(evento.nomeEvento) || [];

    for (const handler of handlers) {
      await this.executarComIdempotencia(evento, handler)
    }
  }

  private async executarComIdempotencia(
    evento: DomainEvent,
    handler: EventHandler
  ): Promise<void> {
    const chave = `${evento.id}::${handler.handlerName}`;

    if (await this.idempotenciaRepo.existe(chave)) {
      return;
    }

    let ultimoErro: Error | null = null;
    const errorHistory: Array<{ at: Date; error: string; stack?: string | undefined }> = [];

    for (let tentativa = 1; tentativa <= this.maxRetries; tentativa++) {
      try {
        await handler.handle(evento);
        await this.idempotenciaRepo.marcar(chave);
        return;

      } catch (erro) {
        ultimoErro = erro as Error;
        errorHistory.push({
          at: new Date(),
          error: ultimoErro.message,
          stack: ultimoErro.stack,
        });

        if (tentativa < this.maxRetries) {
          await this.sleep(1000 * tentativa);
        }
      }
    }
    await this.dlqRepo.salvar({
      outboxId: evento.id,
      nomeEvento: evento.nomeEvento,
      aggregateId: evento.aggregateId,
      dados: evento.dados,
      dataOcorrencia: evento.dataOcorrencia,
      moduloOrigem: evento.moduloOrigem,
      errorHistory,
      failedAt: new Date(),
      retriesTotal: this.maxRetries,
      reprocessado: false,
    });

    console.error(`[DLQ] ${handler.handlerName} → ${evento.id}`);
  }

  inscrever<T extends DomainEvent>(
    nomeEvento: string,
    handler: EventHandler<T>
  ): void {
    const existentes = this.handlers.get(nomeEvento) || [];
    existentes.push(handler as EventHandler);
    this.handlers.set(nomeEvento, existentes);
  }

  private sleep(ms: number): Promise<void> {
    return new Promise(r => setTimeout(r, ms));
  }
}
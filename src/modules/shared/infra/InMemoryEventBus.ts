import { EventBus, EventHandler } from "../application/EventBus";
import { DomainEvent } from "../domain/DomainEvent";

export class InMemoryEventBus implements EventBus {
  private handlers: Map<string, EventHandler[]> = new Map();

  async publicar(evento: DomainEvent): Promise<void> {
    const handlersEvento = this.handlers.get(evento.nomeEvento) || [];

    await Promise.all(
      handlersEvento.map(handler => handler.handle(evento))
    );
  }

  inscrever<T extends DomainEvent>(
    nomeEvento: string,
    handler: EventHandler<T>
  ): void {
    const handlersAtuais = this.handlers.get(nomeEvento) || [];
    handlersAtuais.push(handler as EventHandler);
    this.handlers.set(nomeEvento, handlersAtuais);
  }
}
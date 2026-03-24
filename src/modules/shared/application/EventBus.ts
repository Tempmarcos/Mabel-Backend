import { DomainEvent } from "../domain/DomainEvent";


export interface EventHandler<T extends DomainEvent = DomainEvent> {
  handle(evento: T): Promise<void>;
}

export interface EventBus {
  publicar(evento: DomainEvent): Promise<void>;
  inscrever<T extends DomainEvent>(
    nomeEvento: string, 
    handler: EventHandler<T>
  ): void;
}
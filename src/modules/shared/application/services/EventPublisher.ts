import { AggregateRoot } from "../../domain/AggregateRoot";
import { EventBus } from "../EventBus";

export async function DomainEventPublisher(
    aggregate: AggregateRoot<any, any>,
    eventBus: EventBus
) {
    const eventos = aggregate.obterEventos();

    for (const evento of eventos) {
        await eventBus.publicar(evento);
    }

    aggregate.limparEventos();
}
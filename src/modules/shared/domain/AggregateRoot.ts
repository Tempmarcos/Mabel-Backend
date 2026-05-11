import { Entity } from './Entity';
import { Identifier } from './Identifier';
import { DomainEvent } from './DomainEvent';

export abstract class AggregateRoot<TId extends Identifier, TProps> extends Entity<TId, TProps> {
  private _eventos: DomainEvent[] = [];

  adicionarEvento(evento: DomainEvent): void {
    this._eventos.push(evento);
  }

  obterEventos(): readonly DomainEvent[] {
    return [...this._eventos];
  }

  limparEventos(): void {
    this._eventos = [];
  }
}
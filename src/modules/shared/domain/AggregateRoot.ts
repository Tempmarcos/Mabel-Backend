import { Entity } from './Entity';
import { Identifier } from './Identifier';
import { DomainEvent } from './DomainEvent';

export abstract class AggregateRoot<T extends Identifier> extends Entity<T> {
  private _eventos: DomainEvent[] = [];

  adicionarEvento(evento: DomainEvent): void {
    this._eventos.push(evento);
  }

  obterEventos(): DomainEvent[] {
    return [...this._eventos];
  }

  limparEventos(): void {
    this._eventos = [];
  }
}
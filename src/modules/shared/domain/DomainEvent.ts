export interface DomainEvent {
  readonly id?: string;
  readonly nomeEvento: string;
  readonly moduloOrigem: string;
  readonly dataOcorrencia: Date;
  readonly dados: Record<string, unknown>;
  readonly aggregateId: string;
}
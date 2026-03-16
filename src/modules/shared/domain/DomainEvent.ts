export interface DomainEvent {
  nomeEvento: string;
  dataOcorrencia: Date;
  dados: Record<string, unknown>;
  aggregateId: string;
}
import { readonly } from "zod";

export interface DomainEvent {
  readonly nomeEvento: string;
  readonly dataOcorrencia: Date;
  readonly dados: Record<string, unknown>;
  readonly aggregateId: string;
}
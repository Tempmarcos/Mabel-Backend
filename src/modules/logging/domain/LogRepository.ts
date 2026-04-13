import { LogEvento } from './LogEvento';

export interface LogRepository {
  salvar(log: LogEvento): Promise<void>;
  buscarPorAggregateId(aggregateId: string): Promise<LogEvento[]>;
  buscarPorNomeEvento(nomeEvento: string): Promise<LogEvento[]>;
  buscarPorPeriodo(inicio: Date, fim: Date): Promise<LogEvento[]>;
  buscarTodos(): Promise<LogEvento[]>;
}
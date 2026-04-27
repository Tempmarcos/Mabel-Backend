import prisma from "../../../../prisma/PrismaClient";

import { LogEvento } from "../domain/LogEvento";
import { LogRepository } from "../domain/LogRepository";

export class PrismaLogRepository implements LogRepository {
  async salvar(log: LogEvento): Promise<void> {
    await prisma.logEvento.create({
      data: {
        id: log.id.valor,
        nomeEvento: log.nomeEvento,
        dataOcorrencia: log.dataOcorrencia,
        aggregateId: log.aggregateId,
        dados: JSON.stringify(log.dados),
        moduloOrigem: log.moduloOrigem,
        dataPersistencia: log.dataPersistencia
      }
    });
  }

  async buscarPorAggregateId(aggregateId: string): Promise<LogEvento[]> {
    const data = await prisma.logEvento.findMany({
      where: { aggregateId },
      orderBy: { dataOcorrencia: 'desc' }
    });
    return data.map(d => this.mapearParaDominio(d));
  }

  async buscarPorNomeEvento(nomeEvento: string): Promise<LogEvento[]> {
    const data = await prisma.logEvento.findMany({
      where: { nomeEvento },
      orderBy: { dataOcorrencia: 'desc' }
    });
    return data.map(d => this.mapearParaDominio(d));
  }

  async buscarPorPeriodo(inicio: Date, fim: Date): Promise<LogEvento[]> {
    const data = await prisma.logEvento.findMany({
      where: {
        dataOcorrencia: {
          gte: inicio,
          lte: fim
        }
      },
      orderBy: { dataOcorrencia: 'desc' }
    });
    return data.map(d => this.mapearParaDominio(d));
  }

  async buscarTodos(): Promise<LogEvento[]> {
    const data = await prisma.logEvento.findMany({
      orderBy: { dataOcorrencia: 'desc' }
    });
    return data.map(d => this.mapearParaDominio(d));
  }

  private mapearParaDominio(data: any): LogEvento {
    return LogEvento.criar(
      data.id,
      data.nomeEvento,
      new Date(data.dataOcorrencia),
      data.aggregateId,
      data.dados as Record<string, unknown>,
      data.moduloOrigem,
    );
  }
}
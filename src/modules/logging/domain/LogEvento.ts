import { Identifier } from "../../shared/domain/Identifier";

export class LogId extends Identifier {
  constructor(valor: string) {
    super(valor);
  }
}

interface LogEventoProps {
  nomeEvento: string;
  dataOcorrencia: Date;
  aggregateId: string;
  dados: Record<string, unknown>;
  moduloOrigem: string;
  dataPersistencia: Date;
}

export class LogEvento {
  private constructor(
    private readonly _id: LogId,
    private readonly _props: LogEventoProps
  ) { }

  static criar(
    id: LogId,
    nomeEvento: string,
    dataOcorrencia: Date,
    aggregateId: string,
    dados: Record<string, unknown>,
    moduloOrigem: string
  ): LogEvento {
    return new LogEvento(id, {
      nomeEvento,
      dataOcorrencia,
      aggregateId,
      dados,
      moduloOrigem,
      dataPersistencia: new Date()
    });
  }

  // Getters
  get id(): LogId { return this._id; }
  get nomeEvento(): string { return this._props.nomeEvento; }
  get dataOcorrencia(): Date { return this._props.dataOcorrencia; }
  get aggregateId(): string { return this._props.aggregateId; }
  get dados(): Record<string, unknown> { return this._props.dados; }
  get moduloOrigem(): string { return this._props.moduloOrigem; }
  get dataPersistencia(): Date { return this._props.dataPersistencia; }
}
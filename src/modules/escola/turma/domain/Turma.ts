import { AggregateRoot } from "../../../shared/domain/AggregateRoot"
import { Identifier } from "../../../shared/domain/Identifier"
import { Turno } from "../../../shared/domain/value-objects/Turno"
import { FaixaEtaria } from "./value-objects/FaixaEtaria"
import { NomeTurma } from "./value-objects/NomeTurma"


interface TurmaProps {
  nome: NomeTurma,
  faixaEtaria?: FaixaEtaria,
  capacidade?: number,
  turno: Turno
}

export class TurmaId extends Identifier {
  constructor(valor: string) {
    super(valor);
  }
}

export class Turma extends AggregateRoot<TurmaId, TurmaProps> {
  private constructor(id: TurmaId, props: TurmaProps) {
    super(id, props)
  }

  get nome(): NomeTurma {
    return this.props.nome;
  }

  get turno(): Turno {
    return this.props.turno;
  }

  get capacidade(): number | undefined {
    return this.props.capacidade
  }

  get idadeMinima(): number | undefined {
    return this.props.faixaEtaria?.idadeMinima
  }

  get idadeMaxima(): number | undefined {
    return this.props.faixaEtaria?.idadeMaxima
  }

  get faixaEtaria(): FaixaEtaria | undefined {
    return this.props.faixaEtaria;
  }

  static criar(id: string, nomeString: string, turnoString: Turno, capacidadeInt?: number,
    faixaEtaria?: { idadeMin: number, idadeMax: number }): Turma {
    const props: TurmaProps = {
      nome: NomeTurma.criar(nomeString),
      turno: turnoString,
    };

    if (capacidadeInt !== undefined) {
      props.capacidade = capacidadeInt;
    }

    if (faixaEtaria !== undefined) {
      props.faixaEtaria = FaixaEtaria.criar(faixaEtaria);
    }

    const turma = new Turma(new TurmaId(id), props)
    turma.adicionarEvento(
      criarEventoTurmaCriada(turma._id.valor)
    )

    return turma;
  }

  static restaurar(id: string, nomeString: string, turnoString: Turno, capacidadeInt?: number,
    faixaEtaria?: { idadeMin: number, idadeMax: number }): Turma {
    const props: TurmaProps = {
      nome: NomeTurma.criar(nomeString),
      turno: turnoString,
    };

    if (capacidadeInt !== undefined) {
      props.capacidade = capacidadeInt;
    }

    if (faixaEtaria !== undefined) {
      props.faixaEtaria = FaixaEtaria.criar(faixaEtaria);
    }

    const turma = new Turma(new TurmaId(id), props)

    return turma;
  }
}
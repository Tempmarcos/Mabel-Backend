import { AggregateRoot } from "../../../shared/domain/AggregateRoot"
import { Identifier } from "../../../shared/domain/Identifier"
import { Turno } from "../../../shared/domain/value-objects/Turno"
import { Validador } from "../../../shared/domain/value-objects/Validador"
import { FaixaEtaria } from "./value-objects/FaixaEtaria"
import { NomeTurma } from "./value-objects/NomeTurma"


interface TurmaProps {
  nome: NomeTurma,
  faixaEtaria?: FaixaEtaria,
  capacidade?: number,
  turno: Turno
}

interface TurmaInput {
  nome: string,
  idadeMinima?: number,
  idadeMaxima?: number,
  capacidade?: number,
  turno: string
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

  static criar(id: string, data: TurmaInput): Turma {
    if (!Object.values(Turno).includes(data.turno as Turno)) {
      throw new Error('Turno inválido');
    }
    const props: TurmaProps = {
      nome: NomeTurma.criar(data.nome),
      turno: data.turno as Turno,
    };

    if (data.capacidade !== undefined) {
      const resultado = Validador.combinar(
        Validador.faixa(props.capacidade!, 5, 30, 'Capacidade')
      )
      if (!resultado.valido) {
        throw new Error(resultado.erro);
      }
      props.capacidade = data.capacidade;
    }

    if (data.idadeMinima !== undefined || data.idadeMaxima !== undefined) {
      props.faixaEtaria = FaixaEtaria.criar({ idadeMin: data.idadeMinima, idadeMax: data.idadeMaxima });
    }

    const turma = new Turma(new TurmaId(id), props)
    turma.adicionarEvento(
      criarEventoTurmaCriada(turma._id.valor)
    )

    return turma;
  }

  static restaurar(id: string, data: TurmaInput): Turma {
    if (!Object.values(Turno).includes(data.turno as Turno)) {
      throw new Error('Turno inválido');
    }
    const props: TurmaProps = {
      nome: NomeTurma.criar(data.nome),
      turno: data.turno as Turno,
    };

    if (data.capacidade !== undefined) {
      props.capacidade = data.capacidade;
    }

    if (data.idadeMinima !== undefined || data.idadeMaxima !== undefined) {
      props.faixaEtaria = FaixaEtaria.criar({ idadeMin: data.idadeMinima, idadeMax: data.idadeMaxima });
    }

    const turma = new Turma(new TurmaId(id), props)

    return turma;
  }
}
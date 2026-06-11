import { AggregateRoot } from "../../../shared/domain/AggregateRoot";
import { Identifier } from "../../../shared/domain/Identifier";
import { Nome } from "../../../shared/domain/value-objects/Nome";
import { DataNascimento } from "./value-objects/DataNascimento";
import { Informacoes } from "./value-objects/Informacoes";
import { Medicamentos } from "./value-objects/Medicamentos";
import { Religiao } from "./value-objects/Religiao";

interface AlunoProps {
    nome: Nome,
    dataNascimento: DataNascimento,
    informacoes: Informacoes,
    medicamentos: Medicamentos,
    religiao: Religiao,
    ativo: boolean,
}

export class AlunoId extends Identifier {
    constructor(valor: string) {
        super(valor);
    }
}

export class Aluno extends AggregateRoot<AlunoId, AlunoProps> {
    private constructor(id: AlunoId, props: AlunoProps) {
        super(id, props)
    }

    get ativo(): boolean {
        return this.props.ativo
    }

    get nome(): Nome {
        return this.props.nome;
    }

    get dataNascimento(): DataNascimento {
        return this.props.dataNascimento
    }

    get informacoes(): Informacoes {
        return this.props.informacoes
    }

    get religiao(): Religiao {
        return this.props.religiao
    }

    get medicamentos(): Medicamentos {
        return this.props.medicamentos
    }

    static criar(id: string, nomeString: string, dataNascimentoDate: Date,
        informacoesString: string, medicamentosString: string, religiaoString: string,
        ativo: boolean) {
        const aluno = new Aluno(
            new AlunoId(id),
            {
                nome: Nome.criar(nomeString),
                dataNascimento: DataNascimento.criar(dataNascimentoDate),
                informacoes: Informacoes.criar(informacoesString),
                medicamentos: Medicamentos.criar(medicamentosString),
                religiao: Religiao.criar(religiaoString),
                ativo
            }
        )

        if (aluno.dataNascimento.idade() < 5 || aluno.dataNascimento.idade() > 14) {
            aluno.adicionarEvento(
                criarEventoAlunoForaDaFaixaEtaria(
                    aluno._id.valor,
                    aluno.dataNascimento.idade()
                )
            )
        }

        aluno.adicionarEvento(
            criarEventoAlunoCadastrado(
                aluno._id.valor,
            )
        )
        return aluno;
    }

    static restaurar(id: string, nomeString: string, dataNascimentoDate: Date,
        informacoesString: string, medicamentosString: string, religiaoString: string,
        ativo: boolean) {
        const aluno = new Aluno(
            new AlunoId(id),
            {
                nome: Nome.criar(nomeString),
                dataNascimento: DataNascimento.criar(dataNascimentoDate),
                informacoes: Informacoes.criar(informacoesString),
                medicamentos: Medicamentos.criar(medicamentosString),
                religiao: Religiao.criar(religiaoString),
                ativo
            }
        )
        return aluno;
    }

    desativar() {
        if (this.ativo === false) return

        this.props.ativo = false

        this.adicionarEvento(
            criarEventoAlunoDesativado(
                this._id.valor,
            )
        )
    }

    ativar() {
        if (this.ativo === true) return

        this.props.ativo = true

        if (this.dataNascimento.idade() < 5 || this.dataNascimento.idade() > 14) {
            this.adicionarEvento(
                criarEventoAlunoForaDaFaixaEtaria(
                    this._id.valor,
                    this.dataNascimento.idade()
                )
            )
        }

        this.adicionarEvento(
            criarEventoAlunoAntigoAtivado(
                this._id.valor,
            )
        )
    }
}
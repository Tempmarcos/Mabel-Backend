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
}
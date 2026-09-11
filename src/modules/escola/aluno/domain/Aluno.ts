import { AggregateRoot } from "../../../shared/domain/AggregateRoot";
import { Identifier } from "../../../shared/domain/Identifier";
import { Nome } from "../../../shared/domain/value-objects/Nome";
import { DataNascimento } from "./value-objects/DataNascimento";
import { Informacoes } from "./value-objects/Informacoes";
import { Medicamentos } from "./value-objects/Medicamentos";
import { Religiao } from "./value-objects/Religiao";
import { TipoVinculo, Vinculo } from "./value-objects/Vinculo";

interface AlunoProps {
    nome: Nome,
    dataNascimento: DataNascimento,
    informacoes?: Informacoes,
    medicamentos?: Medicamentos,
    religiao?: Religiao,
    ativo: boolean,
    vinculos: Vinculo[]
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

    get informacoes(): Informacoes | undefined {
        return this.props.informacoes
    }

    get religiao(): Religiao | undefined {
        return this.props.religiao
    }

    get medicamentos(): Medicamentos | undefined {
        return this.props.medicamentos
    }

    get vinculos(): Vinculo[] {
        return [...this.props.vinculos];
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
                ativo,
                vinculos: [],
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
                ativo,
                vinculos: 
            }
        )
        return aluno;
    }

    vincularResponsavel(
        responsavelId: string,
        tipo: string,
        buscaAutorizada: boolean,
        contatoEmergencia: boolean
    ): void {
        // Invariante: não pode vincular o mesmo responsável 2x
        const jaExiste = this.props.vinculos.some(
            v => v.responsavelId.valor === responsavelId
        );
        if (jaExiste) {
            throw new Error('Responsável já vinculado a este aluno');
        }

        // Invariante: só pode ter um PAI e uma MÃE
        const tipoEnum = tipo as TipoVinculo;
        if (tipoEnum === TipoVinculo.PAI || tipoEnum === TipoVinculo.MAE) {
            const jaTem = this.props.vinculos.some(v => v.tipo === tipoEnum);
            if (jaTem) {
                throw new Error(`Aluno já possui ${tipoEnum.toLowerCase()} vinculado`);
            }
        }

        const vinculo = Vinculo.criar(
            responsavelId, tipo, buscaAutorizada, contatoEmergencia
        );

        this.props.vinculos.push(vinculo);

        this.adicionarEvento(
            criarEventoResponsavelVinculado(
                this._id.valor,
                responsavelId,
                tipo
            )
        );
    }

    desvincularResponsavel(responsavelId: string): void {
        const index = this.props.vinculos.findIndex(
            v => v.responsavelId.valor === responsavelId
        );
        if (index === -1) {
            throw new Error('Responsável não vinculado a este aluno');
        }

        this.props.vinculos.splice(index, 1);

        this.adicionarEvento(
            criarEventoResponsavelDesvinculado(this._id.valor, responsavelId)
        );
    }

    atualizarPermissoesVinculo(
        responsavelId: string,
        buscaAutorizada: boolean,
        contatoEmergencia: boolean
    ): void {
        const index = this.props.vinculos.findIndex(
            v => v.responsavelId.valor === responsavelId
        );
        if (index === -1) throw new Error('Vínculo não encontrado');

        this.props.vinculos[index] = Vinculo.criar(
            responsavelId,
            this.props.vinculos[index].tipo,
            buscaAutorizada,
            contatoEmergencia
        );
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
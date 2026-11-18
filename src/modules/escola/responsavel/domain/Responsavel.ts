import { AggregateRoot } from "../../../shared/domain/AggregateRoot";
import { Identifier } from "../../../shared/domain/Identifier";
import { Email } from "../../../shared/domain/value-objects/Email";
import { Nome } from "../../../shared/domain/value-objects/Nome";
import { CPF } from "./value-objects/CPF";
import { Telefone } from "./value-objects/Telefone";

export class ResponsavelId extends Identifier {
    constructor(valor: string) {
        super(valor)
    }
}

export interface ResponsavelInput {
    nome: string,
    cpf: string,
    email?: string,
    telefone?: string,
    trabalho?: string,
    funcao?: string
}

interface ResponsavelProps {
    nome: Nome,
    cpf: CPF,
    email?: Email,
    telefone?: Telefone,
    trabalho?: string,
    funcao?: string
}

export class Responsavel extends AggregateRoot<ResponsavelId, ResponsavelProps> {
    private constructor(id: ResponsavelId, props: ResponsavelProps) {
        super(id, props);
    }

    get nome(): Nome {
        return this.props.nome;
    }
    get cpf(): CPF {
        return this.props.cpf;
    }
    get email(): Email | undefined {
        return this.props.email;
    }
    get telefone(): Telefone | undefined {
        return this.props.telefone;
    }
    get trabalho(): string | undefined {
        return this.props.trabalho;
    }
    get funcao(): string | undefined {
        return this.props.funcao;
    }

    static criar(id: string, data: ResponsavelInput): Responsavel {
        const responsavel = new Responsavel(
            new ResponsavelId(id),
            {
                nome: Nome.criar(data.nome),
                cpf: CPF.criar(data.cpf),
                ...(data.email && { email: Email.criar(data.email) }),
                ...(data.telefone && { telefone: Telefone.criar(data.telefone) }),
                ...(data.trabalho && { trabalho: data.trabalho }),
                ...(data.funcao && { funcao: data.funcao })
            }
        );

        responsavel.adicionarEvento(
            criarEventoResponsavelCadastrado(responsavel._id.valor)
        );

        return responsavel;
    }

    static restaurar(id: string, data: ResponsavelInput): Responsavel {
        const responsavel = new Responsavel(
            new ResponsavelId(id),
            {
                nome: Nome.criar(data.nome),
                cpf: CPF.criar(data.cpf),
                ...(data.email && { email: Email.criar(data.email) }),
                ...(data.telefone && { telefone: Telefone.criar(data.telefone) }),
                ...(data.trabalho && { trabalho: data.trabalho }),
                ...(data.funcao && { funcao: data.funcao })
            }
        );

        return responsavel;
    }
}
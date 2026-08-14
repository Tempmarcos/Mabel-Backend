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

    static criar(
        id: string,
        nomeString: string,
        cpfString: string,
        emailString?: string,
        telefoneString?: string,
        trabalho?: string,
        funcao?: string
    ): Responsavel {
        const responsavel = new Responsavel(
            new ResponsavelId(id),
            {
                nome: Nome.criar(nomeString),
                cpf: CPF.criar(cpfString),        // valida dígitos verificadores
                ...(emailString && { email: Email.criar(emailString) }),
                ...(telefoneString && { telefone: Telefone.criar(telefoneString) }),
                ...(trabalho && { trabalho }),
                ...(funcao && { funcao })
            }
        );

        responsavel.adicionarEvento(
            criarEventoResponsavelCadastrado(responsavel._id.valor)
        );

        return responsavel;
    }
}
import { AggregateRoot } from "../../shared/domain/AggregateRoot";
import { Identifier } from "../../shared/domain/Identifier";
import { Email } from "../../shared/domain/value-objects/Email";
import { Nome } from "../../shared/domain/value-objects/Nome";
import { criarEventoUsuarioCadastrado } from "./events/UsuarioCadastrado";
import { TipoUsuario } from "./TipoUsuario";
import { Senha } from "./value-objects/Senha";

export class UserId extends Identifier {
    constructor(valor: string) {
        super(valor);
    }
}

interface UserProps {
    email: Email;
    nome: Nome;

}

export class User extends AggregateRoot<UserId, UserProps> {
    private constructor(id: UserId, props: UserProps) {
        super(id, props)
    }

    static criar(id: string, emailString: string, nomeString: string) {
        const user = new User(
            new UserId(id),
            { email: Email.criar(emailString), nome: Nome.criar(nomeString) }
        )

        user.adicionarEvento(
            criarEventoUsuarioCadastrado(
                user._id.valor,
                user.props.email.valor,
                TipoUsuario.ADMIN,
                user.props.nome.valor,)
        )

        return user;
    }

    get email(): Email {
        return this.props.email;
    }

    get nome(): Nome {
        return this.props.nome;
    }
}
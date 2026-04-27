import { AggregateRoot } from "../../shared/domain/AggregateRoot";
import { Identifier } from "../../shared/domain/Identifier";
import { Email } from "../../shared/domain/value-objects/Email";
import { Nome } from "../../shared/domain/value-objects/Nome";
import { criarEventoUsuarioCadastrado } from "./events/UsuarioCadastrado";
import { TipoUsuario } from "./TipoUsuario";
import { Senha } from "./value-objects/Senha";

export class UserId extends Identifier {
    constructor(valor: string){
        super(valor);
    }
}

interface UserProps {
    email: Email;
    nome: Nome;

}

export class User extends AggregateRoot<UserId>{
    private readonly _email: Email;
    private readonly _nome: Nome;

    private constructor(id: UserId, props: UserProps){
        super(id, props)
        this._email = props.email;
        this._nome = props.nome;
    }

    static criar(id: string, emailString: string, nomeString: string){
        const email = Email.criar(emailString);
        const nome = Nome.criar(nomeString);
        const user = new User(
            new UserId(id),
            {email, nome}
        )

        user.adicionarEvento(
            criarEventoUsuarioCadastrado(user._id.valor, user._email.valor, TipoUsuario.ADMIN, user._nome.valor,)
        )

        return user;
    }

    get email(): Email {
        return this._email;
    }
    
    get nome(): Nome {
        return this._nome;
    }
}
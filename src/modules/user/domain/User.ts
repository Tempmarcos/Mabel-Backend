import { AggregateRoot } from "../../shared/domain/AggregateRoot";
import { Identifier } from "../../shared/domain/Identifier";
import { Email } from "../../shared/domain/value-objects/Email";
import { Nome } from "../../shared/domain/value-objects/Nome";
import { criarEventoAdminCadastrado } from "./events/AdminCadastrado";
import { criarEventoEmailUserAlterado } from "./events/EmailUserAlterado";
import { criarEventoSenhaAlterada } from "./events/SenhaAlterada";
import { criarEventoUsuarioCadastrado } from "./events/UsuarioCadastrado";
import { Permissoes } from "./value-objects/Permissoes";
import { SenhaHash } from "./value-objects/SenhaHash";


export class UserId extends Identifier {
    constructor(valor: string) {
        super(valor);
    }
}

interface UserProps {
    email: Email;
    nome: Nome;
    senhaHash: SenhaHash;
    permissoes: Permissoes;
    admin: boolean;
}

export class User extends AggregateRoot<UserId, UserProps> {
    private constructor(id: UserId, props: UserProps) {
        super(id, props)
    }

    get email(): Email {
        return this.props.email;
    }

    get nome(): Nome {
        return this.props.nome;
    }

    get admin(): boolean {
        return this.props.admin;
    }

    get permissoes(): Permissoes {
        return this.props.permissoes
    }

    get senhaHash(): SenhaHash {
        return this.props.senhaHash
    }

    static criar(id: string, emailString: string, nomeString: string,
        senhaHashString: string, permissoesArray: string[], admin: boolean) {
        const user = new User(
            new UserId(id),
            {
                email: Email.criar(emailString), nome: Nome.criar(nomeString),
                senhaHash: SenhaHash.criar(senhaHashString),
                permissoes: admin ? Permissoes.todasAsPermissoes() : Permissoes.criar(permissoesArray),
                admin
            }
        )
        if (user.isAdmin()) {
            user.adicionarEvento(
                criarEventoAdminCadastrado(
                    user._id.valor,
                    user.props.email.valor,
                    user.props.nome.valor
                )
            )
        } else {
            user.adicionarEvento(
                criarEventoUsuarioCadastrado(
                    user._id.valor,
                    user.props.email.valor,
                    user.props.nome.valor,)
            )
        }
        return user;
    }

    static restaurar(id: string, emailString: string, nomeString: string,
        senhaHashString: string, permissoesArray: string[], admin: boolean) {
        const user = new User(
            new UserId(id),
            {
                email: Email.criar(emailString), nome: Nome.criar(nomeString),
                senhaHash: SenhaHash.criar(senhaHashString),
                permissoes: Permissoes.criar(permissoesArray),
                admin
            }
        )
        return user;
    }

    mudarSenha(novaSenhaHash: string) {
        const nova = SenhaHash.criar(novaSenhaHash)
        if (this.props.senhaHash.equals(nova)) {
            return
        }
        this.props.senhaHash = nova

        this.adicionarEvento(
            criarEventoSenhaAlterada(
                this._id.valor,
                this.props.email.valor,
                this.props.nome.valor,)
        )
    }

    isAdmin(): boolean {
        return this.props.admin
    }

    mudarEmail(novoEmail: string) {
        const novo = Email.criar(novoEmail)

        if (this.props.email.equals(novo)) {
            return
        }

        const emailAntigo = this.props.email.valor;
        this.props.email = novo

        this.adicionarEvento(
            criarEventoEmailUserAlterado(
                this._id.valor,
                this.props.email.valor,
                this.props.nome.valor,
                emailAntigo)
        )
    }
}
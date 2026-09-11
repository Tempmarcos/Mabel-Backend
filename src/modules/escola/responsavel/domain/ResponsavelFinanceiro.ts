import { AggregateRoot } from "../../../shared/domain/AggregateRoot";
import { Identifier } from "../../../shared/domain/Identifier";
import { Endereco } from "../../../shared/domain/value-objects/Endereco";

export class ResponsavelFinanceiroId extends Identifier {
    constructor(valor: string) {
        super(valor)
    }
}

interface ResponsavelFinanceiroProps {
    endereco: Endereco,
    metodoPagamento: string
}

export class ResponsavelFinanceiro extends AggregateRoot<ResponsavelFinanceiroId, ResponsavelFinanceiroProps> {
    private constructor(id: ResponsavelFinanceiroId, props: ResponsavelFinanceiroProps) {
        super(id, props);
    }

    get endereco(): Endereco {
        return this.props.endereco;
    }

    get metodoPagamento(): string {
        return this.props.metodoPagamento;
    }

    static criar(id: string, metodoPagamento: string, rua: string, estado: string,
        bairro: string, cidade: string, cep: string, numero: string, complemento?: string
    ): ResponsavelFinanceiro {
        const responsavelFinanceiro = new ResponsavelFinanceiro(
            new ResponsavelFinanceiroId(id),
            {
                endereco: Endereco.criar(rua, bairro, cidade, estado, cep, numero, complemento),
                metodoPagamento
            }
        );

        responsavelFinanceiro.adicionarEvento(
            criarEventoResponsavelFinanceiroCadastrado(responsavelFinanceiro._id.valor)
        );

        return responsavelFinanceiro;
    }

    static restaurar(
        id: string, metodoPagamento: string, rua: string, estado: string,
        bairro: string, cidade: string, cep: string, complemento?: string
    ): ResponsavelFinanceiro {
        const responsavel = new ResponsavelFinanceiro(
            new ResponsavelFinanceiroId(id),
            {
                endereco: Endereco.criar(rua, bairro, cidade, estado, cep, complemento),
                metodoPagamento
            }
        );

        return responsavel;
    }
}
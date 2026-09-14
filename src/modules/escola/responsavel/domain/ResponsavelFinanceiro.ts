import { AggregateRoot } from "../../../shared/domain/AggregateRoot";
import { Identifier } from "../../../shared/domain/Identifier";
import { Endereco, EnderecoInput } from "../../../shared/domain/value-objects/Endereco";

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

    static criar(id: string, metodoPagamento: string, endereco: EnderecoInput
    ): ResponsavelFinanceiro {
        const responsavelFinanceiro = new ResponsavelFinanceiro(
            new ResponsavelFinanceiroId(id),
            {
                endereco: Endereco.criar(endereco),
                metodoPagamento
            }
        );

        responsavelFinanceiro.adicionarEvento(
            criarEventoResponsavelFinanceiroCadastrado(responsavelFinanceiro._id.valor)
        );

        return responsavelFinanceiro;
    }

    static restaurar(
        id: string, metodoPagamento: string, endereco: EnderecoInput
    ): ResponsavelFinanceiro {
        const responsavelFinanceiro = new ResponsavelFinanceiro(
            new ResponsavelFinanceiroId(id),
            {
                endereco: Endereco.criar(endereco),
                metodoPagamento
            }
        );

        return responsavelFinanceiro;
    }

    alterarEndereco(enderecoNovo: EnderecoInput): void {
        const enderecoAnterior = this.props.endereco;

        const novoEndereco = Endereco.criar(enderecoNovo);

        this.props.endereco = novoEndereco;

        this.adicionarEvento(
            criarEventoEnderecoResponsavelFinanceiroAlterado(
                this._id.valor,
                enderecoAnterior,
                novoEndereco
            )
        );
    }

    alterarMetodoPagamento(metodoPagamento: string): void {
        if (this.props.metodoPagamento === metodoPagamento) {
            return;
        }

        const metodoAnterior = this.props.metodoPagamento;

        this.props.metodoPagamento = metodoPagamento;

        this.adicionarEvento(
            criarEventoMetodoPagamentoResponsavelFinanceiroAlterado(
                this._id.valor,
                metodoAnterior,
                metodoPagamento
            )
        );
    }
}
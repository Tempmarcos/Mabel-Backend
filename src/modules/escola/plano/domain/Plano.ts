import { AggregateRoot } from "../../../shared/domain/AggregateRoot";
import { Identifier } from "../../../shared/domain/Identifier";
import { Validador } from "../../../shared/domain/value-objects/Validador";

export class PlanoId extends Identifier {
    constructor(valor: string) { super(valor); }
}

interface PlanoProps {
    nome: string,
    descricao: string,
    frequenciaSemanal: number,
    valor: number,
    almoco: boolean;
}

export class Plano extends AggregateRoot<PlanoId, PlanoProps> {
    private constructor(id: PlanoId, props: PlanoProps) {
        super(id, props);
    }

    static criar(id: string, data: PlanoProps) {
        const resultado = Validador.combinar(
            Validador.naoVazio(data.descricao, 'Descrição'),
            Validador.naoVazio(data.nome, 'Nome'),
            Validador.tamanhoMinimo(data.nome, 2, "Nome"),
            Validador.tamanhoMaximo(data.nome, 30, "Nome"),
            Validador.tamanhoMaximo(data.descricao, 100, "Descrição"),
            Validador.faixa(data.valor, 10, 3000, 'Valor'),
            Validador.faixa(data.frequenciaSemanal, 1, 5, 'Frequência Semanal')
        )

        if (!resultado.valido) {
            throw new Error(resultado.erro);
        }

        const plano = new Plano(new PlanoId(id), data);


        plano.adicionarEvento(
            criarEventoPlanoCadastrado(
                plano._id.valor,
                plano.props.nome
            )
        )

        return plano;
    }

    static restaurar(id: string, data: PlanoProps) {
        const resultado = Validador.combinar(
            Validador.naoVazio(data.descricao, 'Descrição'),
            Validador.naoVazio(data.nome, 'Nome'),
            Validador.tamanhoMinimo(data.nome, 2, "Nome"),
            Validador.tamanhoMaximo(data.nome, 30, "Nome"),
            Validador.tamanhoMaximo(data.descricao, 100, "Descrição"),
            Validador.faixa(data.valor, 10, 3000, 'Valor'),
            Validador.faixa(data.frequenciaSemanal, 1, 5, 'Frequência Semanal')
        )

        if (!resultado.valido) {
            throw new Error(resultado.erro);
        }

        const plano = new Plano(new PlanoId(id), data);

        return plano;
    }
}
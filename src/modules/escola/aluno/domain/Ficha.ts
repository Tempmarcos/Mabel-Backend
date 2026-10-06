import { da } from "zod/v4/locales";
import { AggregateRoot } from "../../../shared/domain/AggregateRoot";
import { Identifier } from "../../../shared/domain/Identifier";
import { Endereco, EnderecoInput } from "../../../shared/domain/value-objects/Endereco";
import { DescontoFixo } from "./value-objects/DescontoFixo";
import { DescontoPercentual } from "./value-objects/DescontoPercentual";
import { DiasDaSemana } from "./value-objects/DiasDaSemana";

interface FichaProps {
    valor: number,
    descontoFixo?: DescontoFixo,
    descontoPercentual?: DescontoPercentual,
    diasDaSemana: DiasDaSemana,
    endereco: Endereco,
    serie: string,
    escola: string,
    dataInicio?: Date,
    dataFim?: Date
}

interface FichaCriarInput {
    descontoFixo?: number,
    descontoPercentual?: number,
    valorPlano: number,
    frequenciaPlano: number,
    diasDaSemana: string[],
    endereco: EnderecoInput,
    serie: string,
    escola: string,
    dataInicio?: Date,
    dataFim?: Date
}

interface FichaRestaurarInput {
    valor: number
    descontoFixo?: number
    descontoPercentual?: number
    diasDaSemana: string[]
    endereco: EnderecoInput
    serie: string
    escola: string
    dataInicio?: Date
    dataFim?: Date
}

export class FichaId extends Identifier {
    constructor(valor: string) {
        super(valor);
    }
}

export class Ficha extends AggregateRoot<FichaId, FichaProps> {
    private constructor(id: FichaId, props: FichaProps) {
        super(id, props)
    }

    static criar(id: string, data: FichaCriarInput): Ficha {
        const endereco = Endereco.criar(data.endereco)
        const diasDaSemana = DiasDaSemana.criar(data.diasDaSemana)
        if (diasDaSemana.valor.length > data.frequenciaPlano) {
            throw new Error('Dias da semana são maiores que a frequência do plano')
        }

        const descontoFixo = data.descontoFixo !== undefined
            ? DescontoFixo.criar(data.descontoFixo)
            : undefined

        if (descontoFixo && descontoFixo.valor > data.valorPlano) {
            throw new Error('Desconto não pode ser maior que o valor do plano')
        }

        const descontoPercentual = data.descontoPercentual !== undefined
            ? DescontoPercentual.criar(data.descontoPercentual)
            : undefined

        let valor: number = data.valorPlano;
        if (descontoFixo) {
            valor -= descontoFixo.valor
        }
        if (descontoPercentual) {
            valor -= valor * descontoPercentual.valor / 100
        }

        const ficha = new Ficha(
            new FichaId(id),
            {
                valor,
                diasDaSemana,
                endereco,
                serie: data.serie,
                escola: data.escola,
                ...(descontoFixo !== undefined && { descontoFixo }),
                ...(descontoPercentual !== undefined && { descontoPercentual }),
                ...(data.dataInicio !== undefined && { dataInicio: data.dataInicio }),
                ...(data.dataFim !== undefined && { dataFim: data.dataFim }),
            }
        )

        ficha.adicionarEvento(criarEventoFichaCadastrada(
            ficha._id.valor,
            ficha.props.valor
        ))

        return ficha
    }

    static restaurar(id: string, data: FichaRestaurarInput): Ficha {
        const endereco = Endereco.criar(data.endereco)
        const diasDaSemana = DiasDaSemana.criar(data.diasDaSemana)

        const descontoFixo = data.descontoFixo !== undefined
            ? DescontoFixo.criar(data.descontoFixo)
            : undefined

        const descontoPercentual = data.descontoPercentual !== undefined
            ? DescontoPercentual.criar(data.descontoPercentual)
            : undefined

        const ficha = new Ficha(
            new FichaId(id),
            {
                valor: data.valor,
                diasDaSemana,
                endereco,
                serie: data.serie,
                escola: data.escola,
                ...(descontoFixo !== undefined && { descontoFixo }),
                ...(descontoPercentual !== undefined && { descontoPercentual }),
                ...(data.dataInicio !== undefined && { dataInicio: data.dataInicio }),
                ...(data.dataFim !== undefined && { dataFim: data.dataFim }),
            }
        )

        return ficha
    }
}
import { AggregateRoot } from "../../../shared/domain/AggregateRoot";
import { Identifier } from "../../../shared/domain/Identifier";
import { Endereco } from "../../../shared/domain/value-objects/Endereco";
import { Plano } from "../../plano/domain/Plano";
import { DiasDaSemana } from "./value-objects/DiasDaSemana";

interface FichaProps {
    valor: number,
    descontoFixo?: DescontoFixo,
    descontoPercentual?: DescontoPercentual,
    plano: Plano,
    diasDaSemana: DiasDaSemana,
    endereco: Endereco,
    serie: string,
    escola: string,
    dataInicio: Date,
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
}
import { Validador } from "../../../../shared/domain/value-objects/Validador";
import { ValueObject } from "../../../../shared/domain/ValueObject";

interface Iprops {
    idadeMin: number,
    idadeMax: number
}

export class FaixaEtaria extends ValueObject<Iprops> {
    private constructor(valor: Iprops) {
        super(valor)
    }

    static criar(props: Iprops): FaixaEtaria {
        const resultado = Validador.combinar(
            Validador.maiorQue(props.idadeMax, props.idadeMin, "Idade máxima"),
            Validador.faixa(props.idadeMin, 1, 120, 'Idade mínima'),
            Validador.faixa(props.idadeMax, 1, 120, 'Idade máxima'),
        );

        if (!resultado.valido) {
            throw new Error(resultado.erro);
        }

        return new FaixaEtaria(props)
    }

    contem(idade: number): boolean {
        return idade >= this._props.idadeMin
            && idade <= this._props.idadeMax;
    }
}
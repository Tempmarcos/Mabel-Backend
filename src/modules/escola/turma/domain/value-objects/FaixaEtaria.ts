import { ValueObject } from "../../../../shared/domain/ValueObject";

interface Iprops {
    idadeMin?: number,
    idadeMax?: number
}

export class FaixaEtaria extends ValueObject<Iprops> {
    private constructor(valor: Iprops) {
        super(valor)
    }

    get idadeMinima(): number | undefined {
        return this._props.idadeMin;
    }

    get idadeMaxima(): number | undefined {
        return this._props.idadeMax;
    }

    static criar(props: Iprops): FaixaEtaria {
        if (props.idadeMax === undefined && props.idadeMin === undefined)
            throw new Error('Precisa ser uma faixa válida');
        if (props.idadeMax && (props.idadeMax > 18 || props.idadeMax < 1))
            throw new Error('Precisa ser uma faixa válida');
        if (props.idadeMin && (props.idadeMin > 18 || props.idadeMin < 1))
            throw new Error('Precisa ser uma faixa válida');
        if (props.idadeMin && props.idadeMax && props.idadeMin > props.idadeMax)
            throw new Error('Precisa ser uma faixa válida');

        return new FaixaEtaria(props)
    }

    contem(idade: number): boolean {
        return (this._props.idadeMin === undefined || idade >= this._props.idadeMin)
            && (this._props.idadeMax === undefined || idade <= this._props.idadeMax);
    }
}
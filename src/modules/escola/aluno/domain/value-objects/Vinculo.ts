import { ValueObject } from "../../../../shared/domain/ValueObject";
import { ResponsavelId } from "../../../responsavel/domain/Responsavel";

export enum TipoVinculo {
    PAI = 'PAI',
    MAE = 'MAE',
    PARENTE = 'PARENTE',
    CONHECIDO = 'CONHECIDO',
    TRANSPORTE = 'TRANSPORTE',
}

export class Vinculo extends ValueObject<{
    responsavelId: ResponsavelId;
    tipo: TipoVinculo;
    buscaAutorizada: boolean;
    contatoEmergencia: boolean;
}> {
    private constructor(props: {
        responsavelId: ResponsavelId;
        tipo: TipoVinculo;
        buscaAutorizada: boolean;
        contatoEmergencia: boolean;
    }) {
        super(props);
    }

    static criar(
        responsavelId: string,
        tipo: string,
        buscaAutorizada: boolean,
        contatoEmergencia: boolean
    ): Vinculo {
        if (!Object.values(TipoVinculo).includes(tipo as TipoVinculo)) {
            throw new Error('Tipo de vínculo inválido');
        }

        return new Vinculo({
            responsavelId: new ResponsavelId(responsavelId),
            tipo: tipo as TipoVinculo,
            buscaAutorizada,
            contatoEmergencia,
        });
    }

    get responsavelId(): ResponsavelId { return this._props.responsavelId; }
    get tipo(): TipoVinculo { return this._props.tipo; }
    get buscaAutorizada(): boolean { return this._props.buscaAutorizada; }
    get contatoEmergencia(): boolean { return this._props.contatoEmergencia; }

    autorizarBusca(): Vinculo {
        return new Vinculo({
            ...this._props,
            buscaAutorizada: true,
        });
    }
}
import { ValueObject } from "../../../../shared/domain/ValueObject";
import { ResponsavelId } from "../../../responsavel/domain/Responsavel";
import { AlunoId } from "../Aluno";

export enum TipoVinculo {
    PAI = 'PAI',
    MAE = 'MAE',
    PARENTE = 'PARENTE',
    CONHECIDO = 'CONHECIDO',
    TRANSPORTE = 'TRANSPORTE',
}

export interface VinculoInput {
    alunoId: AlunoId,
    responsavelId: ResponsavelId,
    tipo: string,
    buscaAutorizada: boolean,
    contatoEmergencia: boolean
}

export interface VinculoProps {
    alunoId: AlunoId,
    responsavelId: ResponsavelId,
    tipo: TipoVinculo,
    buscaAutorizada: boolean,
    contatoEmergencia: boolean
}

export class Vinculo extends ValueObject<VinculoProps> {
    private constructor(props: {
        alunoId: AlunoId
        responsavelId: ResponsavelId;
        tipo: TipoVinculo;
        buscaAutorizada: boolean;
        contatoEmergencia: boolean;
    }) {
        super(props);
    }

    static criar(data: VinculoInput): Vinculo {
        if (!Object.values(TipoVinculo).includes(data.tipo as TipoVinculo)) {
            throw new Error('Tipo de vínculo inválido');
        }

        const props: VinculoProps = {
            ...data,
            tipo: data.tipo as TipoVinculo,
        };

        return new Vinculo(props);
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
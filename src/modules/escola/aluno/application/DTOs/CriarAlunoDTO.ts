import { AlunoInput } from "../../domain/Aluno";
import { FichaCriarInput } from "../../domain/Ficha";

export interface CriarAlunoDTO {
    aluno: AlunoInput,
    ficha: FichaCriarInput,
    vinculos: {
        responsavelId: string,
        tipo: string,
        buscaAutorizada: boolean,
        contatoEmergencia: boolean
    }[],
    turmaId: string,
    planoId: string,
    responsavelFinanceiroId: string
}
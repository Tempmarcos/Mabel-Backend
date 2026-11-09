import { EnderecoInput } from "../../../../shared/domain/value-objects/Endereco";
import { AlunoInput } from "../../domain/Aluno";
import { FichaCriarInput } from "../../domain/Ficha";
import { VinculoInput } from "../../domain/value-objects/Vinculo";

export interface CriarAlunoDTO {
    aluno: AlunoInput,
    ficha: FichaCriarInput,
    vinculos: Omit<VinculoInput, 'alunoId'>[]
}
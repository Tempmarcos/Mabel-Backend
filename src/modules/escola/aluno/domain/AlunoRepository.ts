import { Aluno, AlunoId } from "./Aluno";
import { Ficha } from "./Ficha";
import { Vinculo } from "./value-objects/Vinculo";

export interface AlunoRepository {
    criar(aluno: Aluno, ficha: Ficha, vinculos: Vinculo[]): Promise<void>;
    buscarPorId(id: AlunoId): Promise<Aluno | null>;
    buscarTodos(): Promise<Aluno[]>;
    deletar(id: AlunoId): Promise<void>;
}
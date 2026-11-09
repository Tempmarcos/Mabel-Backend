import { Aluno, AlunoId } from "./Aluno";

export interface AlunoRepository {
    criar(aluno: Aluno): Promise<void>;
    buscarPorId(id: AlunoId): Promise<Aluno | null>;
    buscarTodos(): Promise<Aluno[]>;
    deletar(id: AlunoId): Promise<void>;
}
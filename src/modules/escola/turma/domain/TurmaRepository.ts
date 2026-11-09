import { Turma, TurmaId } from "./Turma";

export interface TurmaRepository {
    criar(turma: Turma): Promise<void>;
    buscarPorId(id: TurmaId): Promise<Turma | null>;
    buscarTodos(): Promise<Turma[]>;
    deletar(id: TurmaId): Promise<void>;
}
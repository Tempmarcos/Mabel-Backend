import { Plano, PlanoId } from "./Plano";

export interface PlanoRepository {
    criar(plano: Plano): Promise<void>;
    buscarPorId(id: PlanoId): Promise<Plano | null>;
    buscarTodos(): Promise<Plano[]>;
    deletar(id: PlanoId): Promise<void>;
}
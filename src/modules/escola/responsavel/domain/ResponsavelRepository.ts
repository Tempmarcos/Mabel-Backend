import { Responsavel, ResponsavelId } from "./Responsavel";

export interface ResponsavelRepository {
    criar(responsavel: Responsavel): Promise<void>;
    buscarPorId(id: ResponsavelId): Promise<Responsavel | null>;
    buscarTodos(): Promise<Responsavel[]>;
    deletar(id: ResponsavelId): Promise<void>;
}
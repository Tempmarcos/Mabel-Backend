import { ResponsavelFinanceiro, ResponsavelFinanceiroId } from "./ResponsavelFinanceiro";

export interface ResponsavelFinanceiroRepository {
    criar(responsavel: ResponsavelFinanceiro): Promise<void>;
    buscarPorId(id: ResponsavelFinanceiroId): Promise<ResponsavelFinanceiro | null>;
    buscarTodos(): Promise<ResponsavelFinanceiro[]>;
    deletar(id: ResponsavelFinanceiroId): Promise<void>;
}
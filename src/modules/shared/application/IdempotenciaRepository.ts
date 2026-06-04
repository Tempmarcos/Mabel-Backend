export interface IdempotenciaRepository {
    existe(chave: string): Promise<boolean>
    marcar(chave: string): Promise<void>
    deletarAntigos(corte: Date): Promise<{ count: number }>
}
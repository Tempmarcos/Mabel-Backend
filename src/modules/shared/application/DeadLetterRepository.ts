export interface DeadLetterRepository {
    salvar(entry: any): Promise<void>;
    listarPendentes(): Promise<any[]>;
    marcarReprocessado(id: string): Promise<void>;
}
export interface OutboxRepository {
    claimPendentes(limite: number): Promise<OutboxMessage[]>;
    marcarProcessado(id: string): Promise<void>;
    incrementarRetry(id: string, erro: string): Promise<void>;
    inserir(mensagem: OutboxInput): Promise<void>;
}

export interface OutboxMessage {
    id: string;
    nomeEvento: string;
    aggregateId: string;
    moduloOrigem: string;
    dados: Record<string, unknown>;
    dataOcorrencia: Date;
    status: string;
    retries: number;
}

export interface OutboxInput {
    id: string;
    nomeEvento: string;
    aggregateId: string;
    moduloOrigem: string;
    dados: Record<string, unknown>;
    dataOcorrencia: Date;
}
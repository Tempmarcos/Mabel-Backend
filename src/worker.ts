import { EventBus } from "./modules/shared/application/EventBus";
import { OutboxRepository } from "./modules/shared/application/OutboxRepository";
import { DomainEvent } from "./modules/shared/domain/DomainEvent";

export class OutboxWorker {
    constructor(
        private outboxRepo: OutboxRepository,
        private eventBus: EventBus,
        private intervalMs = 30000 // 30s
    ) { }

    start(): void {
        this.processar(); // Primeira imediata
        setInterval(() => this.processar(), this.intervalMs);
    }

    private async processar(): Promise<void> {
        const pendentes = await this.outboxRepo.claimPendentes(10); // pega e loca

        for (const msg of pendentes) {
            try {
                const evento: DomainEvent = {
                    id: msg.id,
                    nomeEvento: msg.nomeEvento,
                    moduloOrigem: msg.moduloOrigem,
                    dataOcorrencia: msg.dataOcorrencia,
                    dados: msg.dados,
                    aggregateId: msg.aggregateId,
                };

                await this.eventBus.publicar(evento);
                await this.outboxRepo.marcarProcessado(msg.id);

            } catch (erro) {
                // Erro inesperado no bus (não no handler) — raro
                await this.outboxRepo.incrementarRetry(msg.id, (erro as Error).message);
            }
        }
    }
}
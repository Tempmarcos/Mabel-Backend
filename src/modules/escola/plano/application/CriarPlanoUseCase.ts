import { IdGenerator } from "../../../shared/application/IdGenerator";
import { Plano, PlanoProps } from "../domain/Plano";
import { PlanoRepository } from "../domain/PlanoRepository";

export class CriarPlanoUseCase {
    constructor(private planoRepository: PlanoRepository,
        private idGenerator: IdGenerator) { }

    async execute(data: PlanoProps): Promise<Plano> {
        const planoId = this.idGenerator.generate();
        const plano = Plano.criar(planoId, data);

        await this.planoRepository.criar(plano)
        return plano;
    }
}
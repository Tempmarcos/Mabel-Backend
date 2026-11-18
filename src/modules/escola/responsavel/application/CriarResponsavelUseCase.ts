import { IdGenerator } from "../../../shared/application/IdGenerator";
import { Responsavel, ResponsavelInput } from "../domain/Responsavel";
import { ResponsavelRepository } from "../domain/ResponsavelRepository";

export class CriarResponsavelUseCase {
    constructor(private ResponsavelRepository: ResponsavelRepository,
        private idGenerator: IdGenerator) { }

    async execute(data: ResponsavelInput): Promise<Responsavel> {
        const responsavelId = this.idGenerator.generate();
        const responsavel = Responsavel.criar(responsavelId, data);

        await this.ResponsavelRepository.criar(responsavel)
        return responsavel;
    }
}
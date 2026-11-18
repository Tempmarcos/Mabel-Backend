import { IdGenerator } from "../../../shared/application/IdGenerator";
import { ResponsavelId } from "../domain/Responsavel";
import { ResponsavelFinanceiro, ResponsavelFinanceiroInput } from "../domain/ResponsavelFinanceiro";
import { ResponsavelFinanceiroRepository } from "../domain/ResponsavelFinanceiroRepository";
import { ResponsavelRepository } from "../domain/ResponsavelRepository";
import { CriarResponsavelFinanceiroDTO } from "./DTOs/CriarResponsavelFinanceiroDTO";

export class CriarResponsavelFinanceiroUseCase {
    constructor(private responsavelFinanceiroRepository: ResponsavelFinanceiroRepository,
        private responsavelRepository: ResponsavelRepository,
        private idGenerator: IdGenerator) { }

    async execute(data: CriarResponsavelFinanceiroDTO): Promise<ResponsavelFinanceiro> {
        const responsavelFinanceiroId = this.idGenerator.generate();
        const responsavelFinanceiro = ResponsavelFinanceiro.criar(responsavelFinanceiroId, data);

        const responsavel = await this.responsavelRepository.buscarPorId(new ResponsavelId(data.responsavelId));
        if (!responsavel) throw new Error('Responsável não existe')

        await this.responsavelFinanceiroRepository.criar(responsavelFinanceiro)
        return responsavelFinanceiro;
    }
}
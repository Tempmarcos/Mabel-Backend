import { IdGenerator } from "../../../shared/application/IdGenerator";
import { PlanoId } from "../../plano/domain/Plano";
import { PlanoRepository } from "../../plano/domain/PlanoRepository";
import { ResponsavelId } from "../../responsavel/domain/Responsavel";
import { ResponsavelFinanceiroId } from "../../responsavel/domain/ResponsavelFinanceiro";
import { ResponsavelFinanceiroRepository } from "../../responsavel/domain/ResponsavelFinanceiroRepository";
import { ResponsavelRepository } from "../../responsavel/domain/ResponsavelRepository";
import { TurmaId } from "../../turma/domain/Turma";
import { TurmaRepository } from "../../turma/domain/TurmaRepository";
import { Aluno } from "../domain/Aluno";
import { AlunoRepository } from "../domain/AlunoRepository";
import { Ficha } from "../domain/Ficha";
import { Vinculo } from "../domain/value-objects/Vinculo";
import { CriarAlunoDTO } from "./DTOs/CriarAlunoDTO";

export class CriarAlunoUseCase {
    constructor(private alunoRepository: AlunoRepository,
        private responsavelRepository: ResponsavelRepository,
        private responsavelFinanceiroRepository: ResponsavelFinanceiroRepository,
        private turmaRepository: TurmaRepository,
        private planoRepository: PlanoRepository,
        private idGenerator: IdGenerator) { }

    async execute(data: CriarAlunoDTO): Promise<Aluno> {
        const alunoId = this.idGenerator.generate();
        const fichaId = this.idGenerator.generate();
        const aluno = Aluno.criar(alunoId, data.aluno);

        const ficha = Ficha.criar(fichaId, data.ficha)

        const vinculos: Vinculo[] = [];

        let hasPai = false;
        let hasMae = false;

        for (const vinculo of data.vinculos) {
            const responsavelId = new ResponsavelId(vinculo.responsavelId);

            const responsavel = await this.responsavelRepository.buscarPorId(
                responsavelId
            );
            if (!responsavel) {
                throw new Error('Responsável não existe');
            }
            if (vinculo.tipo === 'PAI') {
                if (hasPai) throw new Error('Aluno não pode ter dois pais');
                hasPai = true;
            }
            if (vinculo.tipo === 'MAE') {
                if (hasMae) throw new Error('Aluno não pode ter duas mães');
                hasMae = true;
            }
            const novoVinculo = Vinculo.criar({
                ...vinculo,
                alunoId: aluno.id,
                responsavelId
            });
            vinculos.push(novoVinculo);
        }
        if (hasPai === false || hasMae === false) throw new Error('Aluno deve ter pai e mãe')

        const responsavelFinanceiro = await this.responsavelFinanceiroRepository.buscarPorId(new ResponsavelFinanceiroId(data.responsavelFinanceiroId));
        if (!responsavelFinanceiro) throw new Error('Responsável Financeiro não existe')

        const turma = await this.turmaRepository.buscarPorId(new TurmaId(data.turmaId))
        if (!turma) throw new Error('Turma não existe')

        const plano = await this.planoRepository.buscarPorId(new PlanoId(data.planoId))
        if (!plano) throw new Error('Plano não existe')

        await this.alunoRepository.criar(aluno, ficha, vinculos)
        return aluno;
    }
}
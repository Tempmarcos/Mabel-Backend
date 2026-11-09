import { IdGenerator } from "../../../shared/application/IdGenerator";
import { ResponsavelRepository } from "../../responsavel/domain/ResponsavelRepository";
import { Aluno, AlunoInput } from "../domain/Aluno";
import { AlunoRepository } from "../domain/AlunoRepository";
import { Ficha } from "../domain/Ficha";
import { Vinculo } from "../domain/value-objects/Vinculo";
import { CriarAlunoDTO } from "./DTOs/CriarAlunoDTO";

export class CriarAlunoUseCase {
    constructor(private alunoRepository: AlunoRepository,
        private responsavelRepository: ResponsavelRepository,
        private idGenerator: IdGenerator) { }

    async execute(data: CriarAlunoDTO): Promise<Aluno> {
        const alunoId = this.idGenerator.generate();
        const fichaId = this.idGenerator.generate();
        const aluno = Aluno.criar(alunoId, data.aluno);

        const ficha = Ficha.criar(fichaId, data.ficha)

        //BUSCAR RESPONSÁVEIS NO BANCO
        await this.responsavelRepository.buscarPorId
        data.vinculos.forEach(vinculo => {
            Vinculo.criar({ ...vinculo, alunoId: aluno.id })
        });
        //LIGAR AO RESPONSÁVEL FINANCEIRO
        //buscar e ligar turma e plano



        await this.alunoRepository.criar(aluno)
        return aluno;
    }
}
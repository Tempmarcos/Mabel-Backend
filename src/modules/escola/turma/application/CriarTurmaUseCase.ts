import { IdGenerator } from "../../../shared/application/IdGenerator";
import { UserId } from "../../../user/domain/User";
import { UserRepository } from "../../../user/domain/UserRepository";
import { Turma } from "../domain/Turma";
import { TurmaRepository } from "../domain/TurmaRepository";
import { CriarTurmaDTO } from "./DTOs/CriarTurmaDTO";

export class CriarTurmaUseCase {
    constructor(private turmaRepository: TurmaRepository,
        private userRepository: UserRepository,
        private idGenerator: IdGenerator) { }

    async execute(data: CriarTurmaDTO): Promise<Turma> {
        const turmaId = this.idGenerator.generate();
        const turma = Turma.criar(turmaId, data);

        const professor = await this.userRepository.buscarPorId(new UserId(data.professorId));
        if (!professor) throw new Error('Usuário não existe')


        await this.turmaRepository.criar(turma)
        return turma;
    }
}
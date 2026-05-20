import { IdGenerator } from "../../../shared/application/IdGenerator";
import { PasswordHasher } from "../../domain/services/PasswordHasher";
import { User } from "../../domain/User";
import { UserRepository } from "../../domain/UserRepository";
import { SenhaPura } from "../../domain/value-objects/SenhaPura";
import { CriarUserDTO } from "../DTOs/CriarUserDTO";

export class CriarUserUseCase {
    constructor(private userRepository: UserRepository,
        private idGenerator: IdGenerator,
        private passwordHasher: PasswordHasher) { }

    async execute(userInput: CriarUserDTO): Promise<User> {
        const userExiste = await this.userRepository.buscarPorEmail(userInput.email)
        if (userExiste) throw new Error('Usuário já existe')
        const id = this.idGenerator.generate();
        const senhaPura = SenhaPura.criar(userInput.senha);
        const senhaHash = await this.passwordHasher.hash(senhaPura.valor);
        const user = User.criar(id, userInput.email, userInput.nome, senhaHash, userInput.permissoes, userInput.admin);
        await this.userRepository.salvar(user)
        return user;
    }
}
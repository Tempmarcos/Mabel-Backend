import { EventBus } from "../../../shared/application/EventBus";
import { IdGenerator } from "../../../shared/application/IdGenerator";
import { DomainEventPublisher } from "../../../shared/application/services/EventPublisher";
import { User } from "../../domain/User";
import { UsuarioRepository } from "../../domain/UserRepository";
import { CriarUserDTO } from "../DTOs/CriarUserDTO";

export class CriarUserUseCase {
    constructor(private userRepository: UsuarioRepository,
                private idGenerator: IdGenerator,
                private eventBus: EventBus){}

    async execute(userInput: CriarUserDTO): Promise<User>{
        const userExiste = await this.userRepository.buscarPorEmail(userInput.email)
        if(userExiste) throw new Error('Usuário já existe')

        const id = this.idGenerator.generate();
        const user = User.criar(id, userInput.email, userInput.nome);

        await this.userRepository.salvar(user)
        await DomainEventPublisher(user, this.eventBus);
        
        return user;
    }
}
import prisma from "../../../../prisma/PrismaClient";
import { PrismaEventMapper } from "../../shared/infra/PrismaEventMapper";
import { User, UserId } from "../domain/User";
import { UserRepository } from "../domain/UserRepository";
import { UserMapper } from "./UserMapper";

export class PrismaUserRepo implements UserRepository {
    async salvar(user: User): Promise<void> {
        const data = UserMapper.toPersistence(user);
        const eventos = user.obterEventos();

        await prisma.$transaction([
            prisma.user.create({ data }),
            ...eventos.map(evento =>
            prisma.logEvento.create({
                data: PrismaEventMapper.toLog(evento)
            })
        ),
        ...eventos.map(evento =>
            prisma.outbox.create({
                data: PrismaEventMapper.toOutbox(evento)
            })
        )
        ])
        user.limparEventos()
    }
    buscarPorId(id: UserId): Promise<User | null> {
        throw new Error("Method not implemented.");
    }
    buscarPorEmail(email: string): Promise<User | null> {
        throw new Error("Method not implemented.");
    }
    buscarTodos(): Promise<User[]> {
        throw new Error("Method not implemented.");
    }
    deletar(id: UserId): Promise<void> {
        throw new Error("Method not implemented.");
    }
}
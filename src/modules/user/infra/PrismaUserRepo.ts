import prisma from "../../../../prisma/PrismaClient";
import { User, UserId } from "../domain/User";
import { UserRepository } from "../domain/UserRepository";

export class PrismaUserRepo implements UserRepository {
    salvar(user: User): Promise<void> {
        prisma.$transaction([
            prisma.user.create({
                data: {
                    id: user.id.valor, admin: user, permissoes,
                    nome: user.nome.valor, nomeDeUsuario,
                    senhaHash: user.senha,
                    email: user.email.valor
                }
            }),
            prisma.logEvento.create({
                data: {
                    nomeEvento: user.obterEventos
                }
            }),
            prisma.outbox.create(),
        ])
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
    buscarPorTipo(tipo: string): Promise<User[]> {
        throw new Error("Method not implemented.");
    }
    deletar(id: UserId): Promise<void> {
        throw new Error("Method not implemented.");
    }
}
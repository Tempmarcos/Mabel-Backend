import prisma from "../../../../prisma/PrismaClient";
import { Prisma } from "../../../generated/prisma/client";
import { User, UserId } from "../domain/User";

export class UserMapper {

    static toPersistence(user: User): Prisma.UserCreateInput {
        return {
            id: user.id.valor,
            admin: user.admin,
            nome: user.nome.valor,
            email: user.email.valor,
            senhaHash: user.senhaHash.valor,
            permissoes: user.permissoes.valor,
        };
    }

    static toDomain(raw: Prisma.UserGetPayload<{}>): User {
        return User.restaurar(
            raw.id,
            raw.email,
            raw.nome,
            raw.senhaHash,
            raw.permissoes,
            raw.admin,
        );
    }
}
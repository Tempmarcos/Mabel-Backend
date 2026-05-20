import bcrypt from "bcrypt";
import { PasswordHasher } from "../domain/services/PasswordHasher";

export class BcryptPasswordHasher implements PasswordHasher {
    private static readonly SALT_ROUNDS = 12;

    async hash(senha: string): Promise<string> {
        return await bcrypt.hash(senha, BcryptPasswordHasher.SALT_ROUNDS);
    }

    async compare(senha: string, senhaHash: string): Promise<boolean> {
        return await bcrypt.compare(senha, senhaHash);
    }
}
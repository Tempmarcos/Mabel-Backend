import { IdGenerator } from "../application/IdGenerator";

export class UuidGenerator implements IdGenerator {
    generate(): string {
        return crypto.randomUUID();
    }
}
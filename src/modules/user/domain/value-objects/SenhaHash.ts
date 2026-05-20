import { Validador } from "../../../shared/domain/value-objects/Validador";
import { ValueObject } from "../../../shared/domain/ValueObject";

export class SenhaHash extends ValueObject<string> {
    private constructor(valor: string) {
        super(valor)
    }

    static criar(hash: string): SenhaHash {
        const resultado = Validador.combinar(
            Validador.naoVazio(hash, "Hash"),
        );

        if (!resultado.valido) {
            throw new Error(resultado.erro);
        }

        return new SenhaHash(hash);
    }
}
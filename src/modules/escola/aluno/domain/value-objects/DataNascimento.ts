import { Validador } from "../../../../shared/domain/value-objects/Validador";
import { ValueObject } from "../../../../shared/domain/ValueObject";

export class DataNascimento extends ValueObject<Date> {
    private constructor(valor: Date) {
        super(valor)
    }

    static criar(hash: Date): DataNascimento {
        const resultado = Validador.combinar(
            Validador.naoVazio(hash, "Data de nascimento"),
        );

        if (!resultado.valido) {
            throw new Error(resultado.erro);
        }

        return new DataNascimento(hash);
    }
}
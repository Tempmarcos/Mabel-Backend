import { Validador } from "../../../../shared/domain/value-objects/Validador";
import { ValueObject } from "../../../../shared/domain/ValueObject";

export class NomeTurma extends ValueObject<string> {
    private constructor(valor: string) {
        super(valor)
    }

    static criar(valor: string): NomeTurma {
        const resultado = Validador.combinar(
            Validador.naoVazio(valor, "Nome"),
            Validador.tamanhoMinimo(valor, 2, "Nome"),
            Validador.tamanhoMaximo(valor, 20, "Nome"),
            Validador.regex(valor, /^[A-Za-zÀ-ú0-9'-]+(?: [A-Za-zÀ-ú0-9'-]+)*$/, "Nome",
                "conter apenas letras, espaços, hífens, apóstrofos e números")
        );

        if (!resultado.valido) {
            throw new Error(resultado.erro);
        }

        return new NomeTurma(valor.trim());
    }
}
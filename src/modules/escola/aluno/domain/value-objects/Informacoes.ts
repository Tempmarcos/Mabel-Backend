import { Validador } from "../../../../shared/domain/value-objects/Validador";
import { ValueObject } from "../../../../shared/domain/ValueObject";

export class Informacoes extends ValueObject<string> {
    private constructor(valor: string) {
        super(valor)
    }

    static criar(informacoes: string): Informacoes {
        const resultado = Validador.combinar(
            Validador.naoVazio(informacoes, "Informações"),
            Validador.tamanhoMinimo(informacoes, 3, "Informações"),
            Validador.tamanhoMaximo(informacoes, 200, "Informações"),
            Validador.regex(informacoes, /^[A-Za-zÀ-ú0-9'-]+(?: [A-Za-zÀ-ú0-9'-]+)*$/, "Informações",
                "conter apenas letras, espaços, hífens, apóstrofos e números")
        );

        if (!resultado.valido) {
            throw new Error(resultado.erro);
        }

        return new Informacoes(informacoes);
    }
}
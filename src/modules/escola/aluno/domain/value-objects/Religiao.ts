import { Validador } from "../../../../shared/domain/value-objects/Validador";
import { ValueObject } from "../../../../shared/domain/ValueObject";

export class Religiao extends ValueObject<string> {
    private constructor(valor: string) {
        super(valor)
    }

    static criar(religiao: string): Religiao {
        const resultado = Validador.combinar(
            Validador.naoVazio(religiao, "religiao"),
            Validador.tamanhoMinimo(religiao, 3, "religiao"),
            Validador.tamanhoMaximo(religiao, 30, "religiao"),
            Validador.regex(religiao, /^[A-Za-zÀ-ú'-]+(?: [A-Za-zÀ-ú'-]+)*$/, "Nome",
                "conter apenas letras, espaços, hífens e apóstrofos")
        );

        if (!resultado.valido) {
            throw new Error(resultado.erro);
        }

        return new Religiao(religiao);
    }
}
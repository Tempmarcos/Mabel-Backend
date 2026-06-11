import { Validador } from "../../../../shared/domain/value-objects/Validador";
import { ValueObject } from "../../../../shared/domain/ValueObject";

export class Medicamentos extends ValueObject<string> {
    private constructor(valor: string) {
        super(valor)
    }

    static criar(medicamentos: string): Medicamentos {
        const resultado = Validador.combinar(
            Validador.naoVazio(medicamentos, "Medicamentos"),
            Validador.tamanhoMinimo(medicamentos, 3, "Medicamentos"),
            Validador.tamanhoMaximo(medicamentos, 200, "Medicamentos"),
            Validador.regex(medicamentos, /^[A-Za-zÀ-ú0-9'-]+(?: [A-Za-zÀ-ú0-9'-]+)*$/, "Medicamentos",
                "conter apenas letras, espaços, hífens, apóstrofos e números")
        );

        if (!resultado.valido) {
            throw new Error(resultado.erro);
        }

        return new Medicamentos(medicamentos);
    }
}
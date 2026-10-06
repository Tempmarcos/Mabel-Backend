import { Validador } from "../../../../shared/domain/value-objects/Validador"
import { ValueObject } from "../../../../shared/domain/ValueObject"

export class DescontoPercentual extends ValueObject<number> {
    private constructor(value: number) {
        super(value)
    }

    static criar(value: number): DescontoPercentual {
        const resultado = Validador.combinar(
            Validador.positivo(value, 'Desconto Percentual'),
            Validador.faixa(value, 1, 100, 'Desconto Percentual')
        )

        if (!resultado.valido) {
            throw new Error(resultado.erro);
        }

        return new DescontoPercentual(value)
    }
}
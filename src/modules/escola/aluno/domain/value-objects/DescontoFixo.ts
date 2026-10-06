import { Validador } from "../../../../shared/domain/value-objects/Validador";
import { ValueObject } from "../../../../shared/domain/ValueObject";

export class DescontoFixo extends ValueObject<number> {
    private constructor(value: number) {
        super(value)
    }

    static criar(value: number): DescontoFixo {
        const resultado = Validador.combinar(
            Validador.positivo(value, 'Desconto Fixo'),
        )
        if (!resultado.valido) {
            throw new Error(resultado.erro);
        }

        return new DescontoFixo(value)
    }
}
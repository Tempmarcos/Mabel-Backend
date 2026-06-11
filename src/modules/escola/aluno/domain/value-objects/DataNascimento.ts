import { Validador } from "../../../../shared/domain/value-objects/Validador";
import { ValueObject } from "../../../../shared/domain/ValueObject";

export class DataNascimento extends ValueObject<Date> {
    private constructor(valor: Date) {
        super(valor)
    }

    static criar(data: Date): DataNascimento {
        let dataMinima = new Date();
        dataMinima.setFullYear(dataMinima.getFullYear() - 130)

        const resultado = Validador.combinar(
            Validador.dataPassada(data, "Nascimento"),
            Validador.periodoData(dataMinima, new Date(), data, 'Nascimento')
        );

        if (!resultado.valido) {
            throw new Error(resultado.erro);
        }

        return new DataNascimento(data);
    }

    idade(): number {
        const hoje = new Date();
        let idade = hoje.getFullYear() - this._props.getFullYear();
        const mesAtual = hoje.getMonth();
        const mesNascimento = this._props.getMonth();

        if (mesAtual < mesNascimento ||
            (mesAtual === mesNascimento && hoje.getDate() < this._props.getDate())) {
            idade--;
        }

        return idade
    }
}
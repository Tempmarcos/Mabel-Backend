import { Validador } from "../../../../shared/domain/value-objects/Validador";
import { ValueObject } from "../../../../shared/domain/ValueObject";

export enum DiasSemanais {
    SEGUNDA = 'SEGUNDA',
    TERÇA = 'TERÇA',
    QUARTA = 'QUARTA',
    QUINTA = 'QUINTA',
    SEXTA = 'SEXTA'
}

export class DiasDaSemana extends ValueObject<string[]> {
    private constructor(valor: string[]) {
        super(valor)
    }

    static criar(dias: string[]): DiasDaSemana {
        const resultado = Validador.combinar(
            Validador.tamanhoMaximoArray(dias, 5, 'Dias da semana')
        );

        if (!resultado.valido) {
            throw new Error(resultado.erro);
        }

        const diasValidos = Object.values(DiasSemanais);

        if (dias.some(dia => !diasValidos.includes(dia as DiasSemanais))) {
            throw new Error('Um ou mais dias da semana são inválidos');
        }

        if (new Set(dias).size !== dias.length) {
            throw new Error('Não é permitido repetir dias da semana');
        }

        return new DiasDaSemana(dias);
    }
}
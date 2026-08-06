import { Validador } from "../../../../shared/domain/value-objects/Validador";
import { ValueObject } from "../../../../shared/domain/ValueObject";
import { DddInfo, DDDS } from "./ddd";

export class Telefone extends ValueObject<string> {
    private constructor(value: string) {
        super(value)
    }

    static criar(telefoneString: string) {
        const telefone = telefoneString.replace(/[^\d]+/g, '');

        const resultado = Validador.combinar(
            Validador.naoVazio(telefone, 'telefone'),
            Validador.tamanhoMinimo(telefone, 10, 'telefone'),
            Validador.tamanhoMaximo(telefone, 11, 'telefone')
        );

        if (!resultado.valido) {
            throw new Error(resultado.erro);
        }

        const ddd = telefone.substring(0, 2);

        const infoDdd = DDDS[ddd];

        if (!infoDdd) {
            throw new Error(`DDD ${ddd} inválido.`);
        }

        const primeiroDigito = telefone[2];

        if (
            (telefone.length === 11 && primeiroDigito !== '9') ||
            (telefone.length === 10 && !['2', '3', '4', '5'].includes(primeiroDigito!))
        ) {
            throw new Error('Formato de telefone inválido.');
        }

        return new Telefone(telefone);
    }


    get ddd() {
        return this.valor.substring(0, 2);
    }

    get infoDdd(): DddInfo {
        return DDDS[this.ddd]!;
    }

    get estado() {
        return this.infoDdd.estados;
    }

    get formatado() {
        if (this.valor.length === 11) {
            return `(${this.ddd}) ${this.valor.substring(2, 7)}-${this.valor.substring(7)}`;
        }

        return `(${this.ddd}) ${this.valor.substring(2, 6)}-${this.valor.substring(6)}`;
    }

    get regiao() {
        return this.infoDdd.regiao;
    }
}
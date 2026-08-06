import { Validador } from "../../../../shared/domain/value-objects/Validador";
import { ValueObject } from "../../../../shared/domain/ValueObject";
import { DDDS } from "./ddd";

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

        //comparar ddd com a lista de ddd e 

        return new Telefone(telefone);
    }


    get ddd() {
        return this.valor.substring(0, 2);
    }

    get infoDdd() {
        return DDDS[this.ddd];
    }

    get estado() {
        return this.infoDdd.estados;
    }

    get regiao() {
        return this.infoDdd.regiao;
    }
}
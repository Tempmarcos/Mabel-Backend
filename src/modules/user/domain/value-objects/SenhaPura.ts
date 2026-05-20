import { Validador } from "../../../shared/domain/value-objects/Validador";
import { ValueObject } from "../../../shared/domain/ValueObject";

export class SenhaPura extends ValueObject<string> {
    private constructor(valor: string) {
        super(valor)
    }

    static criar(senha: string): SenhaPura {
        const resultado = Validador.combinar(
            Validador.naoVazio(senha, "Senha"),
            Validador.tamanhoMinimo(senha, 6, "Senha"),
            Validador.tamanhoMaximo(senha, 50, "Senha"),
        );

        if (!resultado.valido) {
            throw new Error(resultado.erro);
        }

        return new SenhaPura(senha);
    }
}
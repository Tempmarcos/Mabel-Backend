import { ValueObject } from "../ValueObject";
import { Validador } from "./Validador";

export class Nome extends ValueObject<string>{
    private constructor(valor: string){
        super(valor)
    }

    static criar(valor: string): Nome{
        const resultado = Validador.combinar(
            Validador.naoVazio(valor, "Nome"),
            Validador.tamanhoMinimo(valor, 3, "Nome"),
            Validador.tamanhoMaximo(valor, 100, "Nome"),
            Validador.regex(valor, /^[a-zA-ZÀ-ú\s'-]+$/, "Nome", 
                "conter apenas letras, espaços, hífens e apóstrofos")
        );

        if (!resultado.valido) {
            throw new Error(resultado.erro);
        }

        return new Nome(valor.trim());
    }
}
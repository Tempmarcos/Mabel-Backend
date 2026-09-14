import { ValueObject } from "../ValueObject";
import { Validador } from "./Validador";

interface CepInfo {
    estados: string[]
    regiao: string;
}

export const primeiroDigitoCepInfo: Record<string, CepInfo> = {
    "0": {
        estados: ['SP'],
        regiao: "Sede São Paulo"
    },
    "1": {
        estados: ['SP'],
        regiao: "Sede Santos"
    },
    "2": {
        estados: ['RJ', 'ES'],
        regiao: "Sede Rio de Janeiro"
    },
    "3": {
        estados: ['MG'],
        regiao: "Sede Belo Horizonte"
    },
    "4": {
        estados: ['BA', 'SE'],
        regiao: "Sede Salvador"
    },
    "5": {
        estados: ['PE', 'AL', 'PB', 'RN'],
        regiao: "Sede Recife"
    },
    "6": {
        estados: ['CE', 'PI', 'MA', 'PA', 'AP', 'AM', 'RR', 'AC'],
        regiao: "Sede Fortaleza"
    },
    "7": {
        estados: ['DF', 'GO', 'RO', 'TO', 'MT', 'MS'],
        regiao: "Sede Brasília"
    },
    "8": {
        estados: ['PR', 'SC'],
        regiao: "Sede Curitiba"
    },
    "9": {
        estados: ['RS'],
        regiao: "Sede Porto Alegre"
    },
}

export class CEP extends ValueObject<string> {
    private constructor(valor: string) {
        super(valor)
    }

    static criar(cepString: string) {
        const cep = cepString.replace(/[^0-9]/g, '');

        const resultado = Validador.combinar(
            Validador.naoVazio(cep, 'CEP'),
            Validador.tamanhoMaximo(cep, 8, 'CEP'),
            Validador.tamanhoMinimo(cep, 8, 'CEP'),
            Validador.regex(cep, /^[0-9]{8}$/, 'CEP', 'deve conter apenas números')
        )

        if (!resultado.valido) {
            throw new Error(resultado.erro);
        }

        return new CEP(cep)
    }

    get primeiroDigitoCep() {
        return this.valor.substring(0, 1);
    }

    get formatado(): string {
        return this.valor.slice(0, 5) + '-' + this.valor.slice(5)
    }
    get regiao() {
        return this.infoCep.regiao;
    }
    get infoCep(): CepInfo {
        return primeiroDigitoCepInfo[this.primeiroDigitoCep]!;
    }

    get estados() {
        return this.infoCep.estados;
    }
}
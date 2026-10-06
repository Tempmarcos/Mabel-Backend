import { ValueObject } from "../ValueObject";
import { CEP } from "./CEP";
import { Validador } from "./Validador";

export interface EnderecoInput {
    rua: string;
    numero: string;
    bairro: string;
    cidade: string;
    estado: string;
    cepString: string;
    complemento?: string;
}

interface EnderecoProps {
    rua: string;
    numero: string;
    bairro: string;
    cidade: string;
    estado: string;
    cep: CEP;
    complemento?: string;
}

export class Endereco extends ValueObject<EnderecoProps> {
    private constructor(valor: EnderecoProps) {
        super(valor)
    }

    static criar({ rua, numero, bairro, cidade, estado, cepString, complemento }: EnderecoInput): Endereco {
        const resultado = Validador.combinar(
            Validador.naoVazio(rua, "Rua"),
            Validador.tamanhoMaximo(rua, 150, "Rua"),

            Validador.naoVazio(numero, "Número"),
            Validador.tamanhoMaximo(numero, 20, "Número"),

            Validador.naoVazio(bairro, "Bairro"),
            Validador.tamanhoMaximo(bairro, 100, "Bairro"),

            Validador.naoVazio(cidade, "Cidade"),
            Validador.tamanhoMaximo(cidade, 100, "Cidade"),

            Validador.naoVazio(estado, "Estado"),
            Validador.regex(
                estado,
                /^[A-Za-zÀ-ÿ]{2}$/,
                "Estado",
                "conter a sigla do estado com 2 letras"
            ),
            ...(complemento !== undefined
                ? [
                    Validador.naoVazio(complemento, "Complemento"),
                    Validador.tamanhoMaximo(complemento, 100, "Complemento")
                ]
                : [])
        );

        if (!resultado.valido) {
            throw new Error(resultado.erro);
        }

        const cep = CEP.criar(cepString);

        if (!cep.estados.includes(estado.toUpperCase())) {
            throw new Error(
                `O CEP ${cep.formatado} não é compatível com o estado ${estado}`
            );
        }

        return new Endereco({ rua, numero, bairro, cidade, estado, cep, ...(complemento !== undefined ? { complemento } : {}) })
    }

    get rua(): string {
        return this.valor.rua
    }
    get bairro(): string {
        return this.valor.bairro
    }
    get cidade(): string {
        return this.valor.cidade
    }
    get estado(): string {
        return this.valor.estado
    }
    get cep(): CEP {
        return this.valor.cep
    }
    get numero(): string {
        return this.valor.numero
    }
    get complemento(): string | undefined {
        return this.valor.complemento
    }
}
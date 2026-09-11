import { ValueObject } from "../ValueObject";
import { CEP } from "./CEP";
import { Validador } from "./Validador";

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

    static criar(rua: string, numero: string, bairro: string, cidade: string,
        estado: string, cepString: string, complemento?: string) {
        const resultado = Validador.combinar(

        )

        const cep = CEP.criar(cepString);

        if (!resultado.valido) {
            throw new Error(resultado.erro);
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
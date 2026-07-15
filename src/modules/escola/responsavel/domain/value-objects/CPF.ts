import { ValueObject } from "../../../../shared/domain/ValueObject";

export class CPF extends ValueObject<string> {
    private constructor(valor: string) {
        super(valor)
    }

    static create(cpfString: string) {
        const cpf = cpfString.replace(/[^\d]+/g, '');

        if (!this.validarCPF(cpf)) throw new Error('Insira um CPF válido')

        return new CPF(cpf)
    }

    private static validarCPF(cpf: string): boolean {
        if (cpf.length !== 11) return false;

        if (/^(\d)\1{10}$/.test(cpf)) return false;

        let soma = 0;
        for (let i = 0; i < 9; i++) {
            soma += parseInt(cpf.charAt(i)) * (10 - i);
        }
        let resto = 11 - (soma % 11);
        if (resto === 10 || resto === 11) resto = 0;
        if (resto !== parseInt(cpf.charAt(9))) return false;

        soma = 0;
        for (let i = 0; i < 10; i++) {
            soma += parseInt(cpf.charAt(i)) * (11 - i);
        }
        resto = 11 - (soma % 11);
        if (resto === 10 || resto === 11) resto = 0;
        if (resto !== parseInt(cpf.charAt(10))) return false;

        return true;
    }

    get formatado() {
        return this.valor.replace(
            /(\d{3})(\d{3})(\d{3})(\d{2})/,
            '$1.$2.$3-$4'
        );
    }
}
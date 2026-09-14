import { describe, expect, it } from "vitest";
import { CEP } from "../../domain/value-objects/CEP";

describe('CEP - Validação', () => {
    it('deve criar e normalizar um CEP válido', () => {
        const cep = CEP.criar('51 99263-1ABC')

        expect(cep).toBeInstanceOf(CEP)
        expect(cep.valor).toBe('51992631')
    });

    const cep = CEP.criar('91 99263-1ABC');

    it('deve retornar o primeiro dígito do cep', () => {
        expect(cep.primeiroDigitoCep).toBe('9')
    })

    it('deve retornar informações do cep', () => {
        expect(cep.infoCep).toMatchObject({
            estados: ['RS'],
            regiao: 'Sede Porto Alegre'
        });
        expect(cep.regiao).toBe("Sede Porto Alegre")
        expect(cep.estados).toEqual(['RS'])
    })

    it('deve retornar o CEP formatado', () => {
        expect(cep.formatado).toBe('91992-631')
    })

    it('deve rejeitar valor nulo', () => {
        expect(() => CEP.criar('')).toThrow('CEP não pode ser vazio')
    })

    it('deve rejeitar valor menor que 8', () => {
        expect(() => CEP.criar('51234-89')).toThrow('CEP deve ter no mínimo 8 caracteres')
    })

    it('deve rejeitar valor maior que 8', () => {
        expect(() => CEP.criar('5193213789231')).toThrow('CEP deve ter no máximo 8 caracteres')
    })
})
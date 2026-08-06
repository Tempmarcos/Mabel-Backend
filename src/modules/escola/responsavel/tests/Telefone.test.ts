import { describe, expect, it } from "vitest";
import { Telefone } from "../domain/value-objects/Telefone";
import { DddInfo } from "../domain/value-objects/ddd";

describe('Telefone - Validação', () => {
    it('deve criar e normalizar um telefone válido', () => {
        const telefone = Telefone.criar('51 99263-1234ABC')

        expect(telefone).toBeInstanceOf(Telefone)
        expect(telefone.valor).toBe('51992631234')
    });

    it('deve criar um telefone válido de 10 dígitos', () => {
        const telefone = Telefone.criar('51 3263-1234ABC')

        expect(telefone).toBeInstanceOf(Telefone)
        expect(telefone.valor).toBe('5132631234')
    });

    const telefone = Telefone.criar('51 99263-1234ABC');

    it('deve retornar o dd do telefone', () => {
        expect(telefone.ddd).toBe('51')
    })

    it('deve retornar informações do ddd', () => {
        expect(telefone.infoDdd).toMatchObject({
            ddd: '51',
            estados: ['RS']
        });
        expect(telefone.regiao).toBe("Porto Alegre e Região Metropolitana/Santa Cruz do Sul/Litoral Norte")
        expect(telefone.estado).toEqual(['RS'])
    })

    it('deve retornar o telefone formatado', () => {
        expect(telefone.formatado).toBe('(51) 99263-1234')

        const telefoneFixo = Telefone.criar('51 3263-1234ABC');
        expect(telefoneFixo.formatado).toBe('(51) 3263-1234')

    })

    it('deve rejeitar valor nulo', () => {
        expect(() => Telefone.criar('')).toThrow('telefone não pode ser vazio')
    })

    it('deve rejeitar valor menor que 10', () => {
        expect(() => Telefone.criar('51 3321378')).toThrow('telefone deve ter no mínimo 10 caracteres')
    })

    it('deve rejeitar valor maior que 11', () => {
        expect(() => Telefone.criar('5193213789231')).toThrow('telefone deve ter no máximo 11 caracteres')
    })

    it('deve rejeitar um ddd inválido', () => {
        expect(() => Telefone.criar('01 99263-1234')).toThrow('DDD 01 inválido.')
    });

    it('deve rejeitar um número de 11 dígitos que não comece com 9', () => {
        expect(() => Telefone.criar('51 89263-1234')).toThrow('Formato de telefone inválido.')
    });

    it('deve rejeitar um número de 10 dígitos que não comece com 2, 3, 4 ou 5', () => {
        expect(() => Telefone.criar('51 9263-1234')).toThrow('Formato de telefone inválido.')
    });
})
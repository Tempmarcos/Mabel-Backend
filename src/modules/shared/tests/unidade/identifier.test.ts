import { describe, expect, it, test } from "vitest";
import { Identifier } from "../../domain/Identifier";

export class FakeIdentifier extends Identifier {
    constructor(valor: string) {
        super(valor);
    }
}

describe('Identifier - Validação', () => {
    it('deve rejeitar valor vazio', () => {
        expect(() => new FakeIdentifier('')).toThrow('Identificador não pode ser vazio')
    })
    it('deve criar identifier com valor válido', () => {
        const identifier = new FakeIdentifier(crypto.randomUUID());
        expect(identifier).toBeInstanceOf(Identifier)
    })
    test('equals true or false', () => {
        const a = new FakeIdentifier('oi')
        const b = new FakeIdentifier('oi')
        const c = new FakeIdentifier('tchau')

        expect(a.equals(b)).toBe(true);
        expect(b.equals(c)).toBe(false)
    })
    it('deve retornar o valor do Identifier', () => {
        const id = crypto.randomUUID();
        const a = new FakeIdentifier(id)

        expect(a.valor).toBe(id)
    })
})
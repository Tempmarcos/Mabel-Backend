import { describe, expect, it } from "vitest";
import { ValueObject } from "../../domain/ValueObject";

class FakeValueObject extends ValueObject<any> {
    constructor(valor: any) {
        super(valor)
    }
}

describe('ValueObject - equals', ()=> {
    it('deve retornar true para valores iguais', () => {
        const a = new FakeValueObject('teste')
        const b = new FakeValueObject('teste')

        expect(a.equals(b)).toBe(true)
    })

    it('deve retornar false para valores diferentes', () => {
        const a = new FakeValueObject('oi')
        const b = new FakeValueObject('tchau')

        expect(a.equals(b)).toBe(false)
    })

    it('deve retornar false para tipos diferentes', () => {
        const a = new FakeValueObject('true')
        const b = new FakeValueObject(true)

        expect(a.equals(b)).toBe(false)
    })

    it('deve considerar objetos iguais', () => {
        const a = new FakeValueObject({ nome: 'teste' })
        const b = new FakeValueObject({ nome: 'teste' })

        expect(a.equals(b)).toBe(true)
    })

    it('deve falhar se ordem das props for diferente', () => {
        const a = new FakeValueObject({ a: 1, b: 2 })
        const b = new FakeValueObject({ b: 2, a: 1 })

        expect(a.equals(b)).toBe(false)
    })

    it('deve retornar false se comparar com null', () => {
        const a = new FakeValueObject('teste')

        expect(a.equals(null as any)).toBe(false)
    })
})

describe('ValueObject - toString', () => {
    it('deve retornar o JSON do valor', () => {
        const a = new FakeValueObject({ nome: 'teste' })

        expect(a.toString()).toBe(JSON.stringify({ nome: 'teste' }))
    })
})
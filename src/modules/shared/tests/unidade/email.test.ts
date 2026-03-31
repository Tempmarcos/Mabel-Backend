import { describe, expect, it } from "vitest";
import { Email } from "../../domain/value-objects/Email";

describe('Email - validação', () => {
    it('deve rejeitar email que não tem @', ()=> {
        expect(()=> {
            const a = Email.criar('emailerrado.com')
        }).toThrow('Email inválido')
    })

    it('deve normalizar letras maiúsculas', () => {
        const email = Email.criar('Teste@Email.com')

        expect(email.valor).toBe('teste@email.com')
    })

    it('deve remover acentos', () => {
        const email = Email.criar('tésté@email.com')

        expect(email.valor).toBe('teste@email.com')
    })
})
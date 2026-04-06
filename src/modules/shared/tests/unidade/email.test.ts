import { describe, expect, it } from "vitest";
import { Email } from "../../domain/value-objects/Email";

describe('Email - validação', () => {
    it('deve rejeitar email que não tem @', ()=> {
        expect(()=> {
            const a = Email.criar('emailerrado.com')
        }).toThrow('Email deve conter um formato válido')
    })

    it('não deve aceitar acentos', () => {     
        expect(() => Email.criar('tésté@email.com')).toThrow('Email deve conter um formato válido')
    })

    it('deve recusar email com menos de 6 caracteres', () => {
        expect(() => Email.criar('a@.br')).toThrow("Email deve ter no mínimo 6 caracteres")
    })

    it('deve recusar email com mais de 100 caracteres', () => {
        expect(() => Email.criar(`${'a'.repeat(91)}@email.com`)).toThrow("Email deve ter no máximo 100 caracteres")
    })

    it('deve criar e normalizar email', () => {
        const email = Email.criar('                  Teste@Email.com ')
    
        expect(email).toBeInstanceOf(Email)
        expect(email.valor).toBe('teste@email.com')
    })
})
import { describe, expect, it } from "vitest";
import { Email } from "../../domain/value-objects/Email";

describe('Email - validação', () => {
    it('deve rejeitar email que não tem @', ()=> {
        expect(()=> {
            const a = Email.criar('emailerrado.com')
        }).toThrow()
    })
})
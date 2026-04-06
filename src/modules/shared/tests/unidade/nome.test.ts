import { describe, expect, it } from "vitest";
import { Nome } from "../../domain/value-objects/Nome";

describe("Nome - Validação", () => {
    it("deve rejeitar nome vazio", ()=> {
        expect(()=>{
            const a = Nome.criar('')
        }).toThrow('Nome não pode ser vazio')
    })

    it("deve rejeitar nome com menos de três caracteres", ()=>{
        expect(()=> {
            const a = Nome.criar('Ab')
        }).toThrow('Nome deve ter no mínimo 3 caracteres')
    })

    const nomeMuitoGrande = 'a'.repeat(101)

    it("deve rejeitar nome com mais de cem caracteres", ()=>{
        expect(()=> {
            const a = Nome.criar(nomeMuitoGrande)
        }).toThrow('Nome deve ter no máximo 100 caracteres')
    })

    it("deve rejeitar nomes com caracteres inválidos", ()=> {
        expect(() => {
            const a = Nome.criar('124@,.{}')
        }).toThrow('Nome deve conter apenas letras, espaços, hífens e apóstrofos')
    })

    it("deve criar e normalizar um nome válido", () => {
        const nome = Nome.criar("           João D'Ávila Alberto-Torres");

        expect(nome).toBeInstanceOf(Nome);
        expect(nome.valor).toBe("João D'Ávila Alberto-Torres")
    })
})
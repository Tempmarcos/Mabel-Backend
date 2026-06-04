import { describe, expect, it } from "vitest";
import { SenhaPura } from "../../domain/value-objects/SenhaPura";

describe('SenhaPura - validação', () => {
    it('deve criar uma senha válida', () => {
        const senha = SenhaPura.criar('senha123');
        expect(senha.valor).toBe('senha123')
        expect(senha).toBeInstanceOf(SenhaPura)
    })
    it('deve rejeitar senha vazia', () => {
        expect(() => SenhaPura.criar('')).toThrow('Senha não pode ser vazio')
    })
    it('deve rejeitar senha com menos de 6 caracteres', () => {
        expect(() => SenhaPura.criar('senha')).toThrow('Senha deve ter no mínimo 6 caracteres')
    })
    it('deve rejeitar senha com mais de 50 caracteres', () => {
        expect(() => SenhaPura.criar(`Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
            Nunc felis nisl, placerat ac lorem et, congue cursus nibh. In facilisis cursus 
            suscipit. Morbi id posuere sapien. Mauris pharetra placerat augue, et rhoncus dolor 
            porta ac. Praesent ultricies leo facilisis mi iaculis, at lacinia leo suscipit. Donec 
            ultricies quam odio. Maecenas in.`)).toThrow('Senha deve ter no máximo 50 caracteres')
    })
})
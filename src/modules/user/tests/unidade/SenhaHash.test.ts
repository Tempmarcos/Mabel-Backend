import { describe, expect, it } from "vitest";
import { SenhaHash } from "../../domain/value-objects/SenhaHash";

describe('SenhaHash - validação', () => {
    it('deve criar um hash válido', () => {
        const hash = SenhaHash.criar('oi');
        expect(hash.valor).toBe('oi')
        expect(hash).toBeInstanceOf(SenhaHash)
    })
    it('deve rejeitar hash vazio', () => {
        expect(() => SenhaHash.criar('')).toThrow('Hash não pode ser vazio')
    })
})
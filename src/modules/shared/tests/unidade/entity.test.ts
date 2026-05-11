import { describe, expect, it } from "vitest";
import { Entity } from "../../domain/Entity";
import { FakeIdentifier } from "./identifier.test";

interface FakeProps {
    nome: string;
}

class FakeEntity extends Entity<FakeIdentifier, FakeProps> {
    private readonly _parameter: string;

    constructor(id: FakeIdentifier, props: FakeProps) {
        super(id, props)
        this._parameter = props.nome;
    }
}

describe('Entity - testes', () => {
    it('deve retornar o id da entidade', () => {
        const id = crypto.randomUUID();
        const a = new FakeEntity(new FakeIdentifier(id), { 'nome': 'ola' })

        expect(a.id).toBeInstanceOf(FakeIdentifier);
        expect(a.id.valor).toBe(id)
    })
    it('deve retornar false para entidades diferentes', () => {
        const a = new FakeEntity(new FakeIdentifier(crypto.randomUUID()), { 'nome': 'ola' })
        const b = new FakeEntity(new FakeIdentifier(crypto.randomUUID()), { 'nome': 'ola' })

        expect(a.equals(b)).toBe(false)
    })
    it('deve retornar true para a mesma entidade', () => {
        const id = crypto.randomUUID();
        const a = new FakeEntity(new FakeIdentifier(id), { 'nome': 'ola' })
        const b = new FakeEntity(new FakeIdentifier(id), { 'nome': 'tchau' })

        expect(a.equals(b)).toBe(true)
    })
})
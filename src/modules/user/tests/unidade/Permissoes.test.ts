import { describe, expect, it } from "vitest";
import { Permissoes } from "../../domain/value-objects/Permissoes";

describe('Permissões - validação', () => {
    it('deve rejeitar permissão inválida', () => {
        const permissao = ['verAlunos', 'criarAlunos', 'permissaoErrada'];
        expect(() => Permissoes.criar(permissao)).toThrow('Permissão inválida');
    })
    it('deve rejeitar string vazia como permissão', () => {
        const permissao = ['verAlunos', 'criarAlunos', ''];
        expect(() => Permissoes.criar(permissao)).toThrow('Permissão inválida');
    })
    it('deve criar permissões válidas', () => {
        const permissao = ['verAlunos', 'criarAlunos'];
        const permissoesTeste = Permissoes.criar(permissao);
        expect(permissoesTeste).toBeInstanceOf(Permissoes);
    })
    it('deve criar array vazio', () => {
        const permissao: string[] = []
        const permissoesTeste = Permissoes.criar(permissao)
        expect(permissoesTeste).toBeInstanceOf(Permissoes);
        expect(permissoesTeste.valor).toHaveLength(0);
    })
    it('deve remover permissões duplicadas', () => {
        const permissao = ['verAlunos', 'criarAlunos', 'verAlunos', 'criarAlunos'];
        const permissoesTeste = Permissoes.criar(permissao);
        expect(permissoesTeste).toBeInstanceOf(Permissoes);
        expect(permissoesTeste.valor).toHaveLength(2);
        expect(permissoesTeste.valor).toEqual(expect.arrayContaining(['verAlunos', 'criarAlunos']));
    })
})

describe('Permissões - Métodos', () => {
    it('deve verificar se possui uma permissão', () => {
        const p = Permissoes.criar(['verAlunos']);
        expect(p.possui('verAlunos')).toBe(true);
        expect(p.possui('criarAlunos')).toBe(false);
    });
    it('deve retornar true se possui todas as permissões de outro conjunto', () => {
        const p1 = Permissoes.criar(['verAlunos', 'criarAlunos']);
        const p2 = Permissoes.criar(['verAlunos']);

        expect(p1.possuiTodasDe(p2)).toBe(true);
    });
    it('deve retornar false se não possui todas as permissões de outro conjunto', () => {
        const p1 = Permissoes.criar(['verAlunos', 'criarAlunos']);
        const p2 = Permissoes.criar(['verAlunos', 'deletarTurmas']);

        expect(p1.possuiTodasDe(p2)).toBe(false);
    });
    it('deve verificar se possui alguma das permissões de outro conjunto', () => {
        const p1 = Permissoes.criar(['verAlunos', 'criarAlunos']);
        const p2 = Permissoes.criar(['verAlunos', 'deletarTurmas']);

        expect(p1.possuiAlgumaDe(p2)).toBe(true);
    });
    it('deve verificar se não possui alguma das permissões de outro conjunto', () => {
        const p1 = Permissoes.criar(['criarTurmas', 'criarAlunos']);
        const p2 = Permissoes.criar(['verAlunos', 'deletarTurmas']);

        expect(p1.possuiAlgumaDe(p2)).toBe(false);
    });
})
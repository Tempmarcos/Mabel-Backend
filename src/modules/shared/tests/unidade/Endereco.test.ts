import { describe, expect, it } from "vitest"
import { Endereco } from "../../domain/value-objects/Endereco"

describe('Endereco - Validação', () => {
    it('deve criar um endereço válido', () => {
        const endereco = Endereco.criar({
            rua: 'Rua dos Andradas',
            numero: '100',
            bairro: 'Centro',
            cidade: 'Porto Alegre',
            estado: 'RS',
            cepString: '91 99263-1ABC'
        }
        )

        expect(endereco).toBeInstanceOf(Endereco)
        expect(endereco.rua).toBe('Rua dos Andradas')
        expect(endereco.numero).toBe('100')
        expect(endereco.bairro).toBe('Centro')
        expect(endereco.cidade).toBe('Porto Alegre')
        expect(endereco.estado).toBe('RS')
        expect(endereco.cep.valor).toBe('91992631')
    })

    it('deve criar um endereço com complemento', () => {
        const endereco = Endereco.criar({
            rua: 'Rua dos Andradas',
            numero: '100',
            bairro: 'Centro',
            cidade: 'Porto Alegre',
            estado: 'RS',
            cepString: '91 99263-1ABC',
            complemento: 'Apartamento 302'
        }
        )

        expect(endereco.complemento).toBe('Apartamento 302')
    })

    it('deve criar um endereço sem complemento', () => {
        const endereco = Endereco.criar({
            rua: 'Rua dos Andradas',
            numero: '100',
            bairro: 'Centro',
            cidade: 'Porto Alegre',
            estado: 'RS',
            cepString: '91 99263-1ABC'
        }
        )

        expect(endereco.complemento).toBeUndefined()
    })

    it('deve rejeitar rua vazia', () => {
        expect(() =>
            Endereco.criar({
                rua: '',
                numero: '100',
                bairro: 'Centro',
                cidade: 'Porto Alegre',
                estado: 'RS',
                cepString: '91 99263-1ABC'
            }
            )
        ).toThrow('Rua não pode ser vazio')
    })

    it('deve rejeitar número vazio', () => {
        expect(() =>
            Endereco.criar({
                rua: 'Rua dos Andradas',
                numero: '',
                bairro: 'Centro',
                cidade: 'Porto Alegre',
                estado: 'RS',
                cepString: '91 99263-1ABC'
            }
            )
        ).toThrow('Número não pode ser vazio')
    })

    it('deve rejeitar bairro vazio', () => {
        expect(() =>
            Endereco.criar({
                rua: 'Rua dos Andradas',
                numero: '100',
                bairro: '',
                cidade: 'Porto Alegre',
                estado: 'RS',
                cepString: '91 99263-1ABC'
            }
            )
        ).toThrow('Bairro não pode ser vazio')
    })

    it('deve rejeitar cidade vazia', () => {
        expect(() =>
            Endereco.criar({
                rua: 'Rua dos Andradas',
                numero: '100',
                bairro: 'Centro',
                cidade: '',
                estado: 'RS',
                cepString: '91 99263-1ABC'
            }
            )
        ).toThrow('Cidade não pode ser vazio')
    })

    it('deve rejeitar estado vazio', () => {
        expect(() =>
            Endereco.criar({
                rua: 'Rua dos Andradas',
                numero: '100',
                bairro: 'Centro',
                cidade: 'Porto Alegre',
                estado: '',
                cepString: '91 99263-1ABC'
            }
            )
        ).toThrow('Estado não pode ser vazio')
    })

    it('deve rejeitar estado inválido', () => {
        expect(() =>
            Endereco.criar({
                rua: 'Rua dos Andradas',
                numero: '100',
                bairro: 'Centro',
                cidade: 'Porto Alegre',
                estado: 'XXX',
                cepString: '91 99263-1ABC'
            }
            )
        ).toThrow('Estado deve conter a sigla do estado com 2 letras')
    })

    it('deve rejeitar CEP inválido', () => {
        expect(() =>
            Endereco.criar({
                rua: 'Rua dos Andradas',
                numero: '100',
                bairro: 'Centro',
                cidade: 'Porto Alegre',
                estado: 'RS',
                cepString: '123'
            }
            )
        ).toThrow('CEP deve ter no mínimo 8 caracteres')
    })

    it('deve rejeitar CEP incompatível com o estado', () => {
        expect(() =>
            Endereco.criar({
                rua: 'Rua dos Andradas',
                numero: '100',
                bairro: 'Centro',
                cidade: 'Porto Alegre',
                estado: 'SP',
                cepString: '91 99263-1ABC'
            }
            )
        ).toThrow('não é compatível com o estado')
    })

    it('deve rejeitar complemento vazio', () => {
        expect(() =>
            Endereco.criar({
                rua: 'Rua dos Andradas',
                numero: '100',
                bairro: 'Centro',
                cidade: 'Porto Alegre',
                estado: 'RS',
                cepString: '91 99263-1ABC',
                complemento: ''
            }
            )
        ).toThrow('Complemento não pode ser vazio')
    })
})
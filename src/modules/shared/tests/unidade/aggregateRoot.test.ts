import { describe, expect, it } from "vitest";
import { AggregateRoot } from "../../domain/AggregateRoot";
import { FakeIdentifier } from "./identifier.test";

interface FakeProps {
    nome: string;
}

export class FakeAggregate extends AggregateRoot<FakeIdentifier, FakeProps> {
    constructor(id: FakeIdentifier, props: FakeProps) {
        super(id, props)
    }
}

describe('AggregateRoot - Testes', () => {
    it('deve adicionar eventos na lista', () => {
        const aggregate = new FakeAggregate(new FakeIdentifier('a'), { nome: 'b' });
        expect(aggregate.obterEventos()).toHaveLength(0)
        aggregate.adicionarEvento({ nomeEvento: 'Evento', moduloOrigem: 'fake', dataOcorrencia: new Date(), aggregateId: aggregate.id.valor, dados: { nome: 'ola' } })
        expect(aggregate.obterEventos()).toHaveLength(1)
    })
    it('deve obter a lista dos eventos', () => {
        const data = new Date(2022, 3, 4)
        const aggregate = new FakeAggregate(new FakeIdentifier('a'), { nome: 'b' });
        aggregate.adicionarEvento({ nomeEvento: 'Evento', moduloOrigem: 'fake', dataOcorrencia: data, aggregateId: aggregate.id.valor, dados: { nome: '1' } })
        aggregate.adicionarEvento({ nomeEvento: 'Evento', moduloOrigem: 'fake', dataOcorrencia: data, aggregateId: aggregate.id.valor, dados: { nome: '2' } })
        aggregate.adicionarEvento({ nomeEvento: 'Evento', moduloOrigem: 'fake', dataOcorrencia: data, aggregateId: aggregate.id.valor, dados: { nome: '3' } })
        aggregate.adicionarEvento({ nomeEvento: 'Evento', moduloOrigem: 'fake', dataOcorrencia: data, aggregateId: aggregate.id.valor, dados: { nome: '4' } })
        expect(aggregate.obterEventos()).toEqual(
            [{
                nomeEvento: 'Evento',
                moduloOrigem: 'fake',
                dataOcorrencia: new Date(2022, 3, 4),
                aggregateId: 'a',
                dados: { nome: '1' }
            },
            {
                nomeEvento: 'Evento',
                moduloOrigem: 'fake',
                dataOcorrencia: new Date(2022, 3, 4),
                aggregateId: 'a',
                dados: { nome: '2' }
            },
            {
                nomeEvento: 'Evento',
                moduloOrigem: 'fake',
                dataOcorrencia: new Date(2022, 3, 4),
                aggregateId: 'a',
                dados: { nome: '3' }
            },
            {
                nomeEvento: 'Evento',
                moduloOrigem: 'fake',
                dataOcorrencia: new Date(2022, 3, 4),
                aggregateId: 'a',
                dados: { nome: '4' }
            }
            ])
    })
    it('deve limpar a lista de eventos', () => {
        const aggregate = new FakeAggregate(new FakeIdentifier('a'), { nome: 'b' });
        aggregate.adicionarEvento({ nomeEvento: 'Evento', moduloOrigem: 'fake', dataOcorrencia: new Date(), aggregateId: aggregate.id.valor, dados: { nome: 'ola' } })
        expect(aggregate.obterEventos()).toHaveLength(1)
        aggregate.limparEventos();
        expect(aggregate.obterEventos()).toHaveLength(0)

    })
    it('não deve permitir modificar a lista interna de eventos', () => {
        const aggregate = new FakeAggregate(
            new FakeIdentifier('a'),
            { nome: 'b' }
        );

        aggregate.adicionarEvento({
            nomeEvento: 'Evento',
            moduloOrigem: 'fake',
            dataOcorrencia: new Date(),
            aggregateId: aggregate.id.valor,
            dados: {}
        });

        const eventos = aggregate.obterEventos();

        // @ts-ignore
        eventos.push({
            nomeEvento: 'Hack',
            dataOcorrencia: new Date(),
            aggregateId: 'x',
            dados: {}
        });

        expect(aggregate.obterEventos()).toHaveLength(1);
    });
})
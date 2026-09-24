import { AggregateRoot } from "../../../shared/domain/AggregateRoot";
import { Identifier } from "../../../shared/domain/Identifier";
import { Turno } from "../../../shared/domain/value-objects/Turno";
import { Validador } from "../../../shared/domain/value-objects/Validador";
import { AlunoId } from "../../aluno/domain/Aluno";

export class DiariaId extends Identifier {
    constructor(valor: string) { super(valor); }
}

interface DiariaProps {
    alunoId: AlunoId;
    data: Date;
    turno: Turno;
    valor: number;
}

export interface DiariaInput {
    alunoId: string;
    data: Date;
    turno: string;
    valor: number;
}

export class Diaria extends AggregateRoot<DiariaId, DiariaProps> {
    private constructor(id: DiariaId, props: DiariaProps) {
        super(id, props);
    }

    get alunoId(): AlunoId { return this.props.alunoId; }
    get data(): Date { return this.props.data; }
    get turno(): Turno { return this.props.turno; }
    get valor(): number { return this.props.valor; }

    static registrar(id: string, value: DiariaInput): Diaria {
        if (!Object.values(Turno).includes(value.turno as Turno)) {
            throw new Error('Turno inválido');
        }
        const hoje = new Date();
        hoje.setHours(0, 0, 0, 0);
        const dataInput = new Date(value.data);
        dataInput.setHours(0, 0, 0, 0);

        if (dataInput > hoje) {
            throw new Error('Data da chamada não pode ser futura');
        }

        const umAnoAtras = new Date();
        umAnoAtras.setFullYear(umAnoAtras.getFullYear() - 1);
        umAnoAtras.setHours(0, 0, 0, 0);

        if (dataInput < umAnoAtras) {
            throw new Error('Data da chamada não pode ser anterior a 1 ano');
        }

        Validador.combinar(
            Validador.maiorQue(value.valor, -1, 'valor'),
            Validador.menorQue(value.valor, 500, 'valor')
        )

        const diaria = new Diaria(
            new DiariaId(id),
            {
                alunoId: new AlunoId(value.alunoId),
                data: value.data,
                turno: value.turno as Turno,
                valor: value.valor,
            }
        );

        diaria.adicionarEvento(
            criarEventoDiariaRegistrada(
                diaria._id.valor,
                value.alunoId,
                value.data,
                value.turno,
                value.valor
            )
        );

        return diaria;
    }

    static restaurar(id: string, data: DiariaInput): Diaria {
        const diaria = new Diaria(
            new DiariaId(id),
            {
                alunoId: new AlunoId(data.alunoId),
                data: data.data,
                turno: data.turno as Turno,
                valor: data.valor,
            }
        );

        return diaria;
    }

    excluirDiaria(): void {

    }

}
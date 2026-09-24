import { AggregateRoot } from "../../../shared/domain/AggregateRoot";
import { Identifier } from "../../../shared/domain/Identifier";
import { Turno } from "../../../shared/domain/value-objects/Turno";
import { AlunoId } from "../../aluno/domain/Aluno";

export class ChamadaId extends Identifier {
    constructor(valor: string) { super(valor); }
}

interface ChamadaProps {
    alunoId: AlunoId;
    data: Date;
    turno: Turno;
    presente: boolean;
}

export interface ChamadaInput {
    alunoId: string;
    data: Date;
    turno: string;
    presente: boolean;
}

export class Chamada extends AggregateRoot<ChamadaId, ChamadaProps> {
    private constructor(id: ChamadaId, props: ChamadaProps) {
        super(id, props);
    }

    get alunoId(): AlunoId { return this.props.alunoId; }
    get data(): Date { return this.props.data; }
    get turno(): Turno { return this.props.turno; }
    get presente(): boolean { return this.props.presente; }


    static registrar(id: string, value: ChamadaInput): Chamada {
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

        const chamada = new Chamada(
            new ChamadaId(id),
            {
                alunoId: new AlunoId(value.alunoId),
                data: dataInput,
                turno: value.turno as Turno,
                presente: value.presente,
            }
        );

        chamada.adicionarEvento(
            criarEventoPresencaRegistrada(
                chamada._id.valor,
                value.alunoId,
                value.data,
                value.turno,
                value.presente
            )
        );

        return chamada;
    }

    static restaurar(id: string, props: ChamadaInput): Chamada {
        return new Chamada(new ChamadaId(id), {
            alunoId: new AlunoId(props.alunoId),
            data: props.data,
            turno: props.turno as Turno,
            presente: props.presente,
        });
    }

    corrigirPresenca(novoStatus: boolean, professorId: string): void {
        if (this.props.presente === novoStatus) return;

        const anterior = this.props.presente;
        this.props.presente = novoStatus;

        this.adicionarEvento(
            criarEventoPresencaCorrigida(
                this._id.valor,
                this.props.alunoId.valor,
                this.props.data,
                this.props.turno,
                anterior,
                novoStatus,
                professorId
            )
        );
    }
}
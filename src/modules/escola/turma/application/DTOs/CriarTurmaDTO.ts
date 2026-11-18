import { Turno } from "../../../../shared/domain/value-objects/Turno";

export interface CriarTurmaDTO {
    nome: string,
    turno: Turno,
    professorId: string
    idadeMinima?: number,
    idadeMaxima?: number,
    capacidade?: number,
}
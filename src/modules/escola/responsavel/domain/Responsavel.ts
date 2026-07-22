import { AggregateRoot } from "../../../shared/domain/AggregateRoot";
import { Identifier } from "../../../shared/domain/Identifier";
import { Email } from "../../../shared/domain/value-objects/Email";
import { Nome } from "../../../shared/domain/value-objects/Nome";
import { CPF } from "./value-objects/CPF";

export class ResponsavelId extends Identifier {
    constructor(valor: string) {
        super(valor)
    }
}

interface ResposavelProps {
    nome: Nome,
    cpf: CPF,
    email?: Email,

    trabalho?: string,
    funcao: string
}


export class Responsavel extends AggregateRoot<ResponsavelId, ResposavelProps> {

}
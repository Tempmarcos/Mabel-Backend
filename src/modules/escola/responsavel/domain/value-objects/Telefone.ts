import { ValueObject } from "../../../../shared/domain/ValueObject";

export class Telefone extends ValueObject<string> {
    constructor(value: string) {
        super(value)
    }


}
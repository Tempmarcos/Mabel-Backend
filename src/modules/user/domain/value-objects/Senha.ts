import { ValueObject } from "../../../shared/domain/ValueObject";

export class Senha extends ValueObject<string> {
    private constructor(valor: string){
        super(valor)
    }
}
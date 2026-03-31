import { ValueObject } from "../ValueObject";

export class Nome extends ValueObject<string>{
    private constructor(valor: string){
        super(valor)
    }

    static criar(valor: string): Nome{
        return new Nome(valor)
    }
}
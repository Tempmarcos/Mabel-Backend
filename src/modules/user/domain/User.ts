import { AggregateRoot } from "../../shared/domain/AggregateRoot";
import { Identifier } from "../../shared/domain/Identifier";

export class UserId extends Identifier {
    constructor(valor: string){
        super(valor);
    }
}

export class User extends AggregateRoot<UserId>{

}
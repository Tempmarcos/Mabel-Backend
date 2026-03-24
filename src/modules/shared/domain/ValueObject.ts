export abstract class ValueObject<T> {
    protected constructor(protected readonly _props: T){}

    equals(vo: ValueObject<T>): boolean {
        if (!vo || !(vo instanceof ValueObject)) return false;

        return JSON.stringify(this._props) === JSON.stringify(vo._props);
    }

    toString(): string {
        return JSON.stringify(this._props);
    }
}
export abstract class ValueObject<T> {
    protected constructor(protected readonly _props: T){}

    get valor(): T {
        return this._props;
    }

    equals(vo: ValueObject<T>): boolean {
        if (!vo || !(vo instanceof ValueObject)) return false;

        return JSON.stringify(this._props) === JSON.stringify(vo._props);
    }

    toString(): string {
    if (
            typeof this._props === 'string' ||
            typeof this._props === 'number' ||
            typeof this._props === 'boolean'
        ) {
            return String(this._props);
        }

        return JSON.stringify(this._props);
    }
}
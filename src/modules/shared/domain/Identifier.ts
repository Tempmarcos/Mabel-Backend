export abstract class Identifier {
  protected constructor(private readonly _valor: string) {
    if (!_valor) {
      throw new Error('Identificador não pode ser vazio');
    }
  }

  get valor(): string {
    return this._valor;
  }

  equals(id: Identifier): boolean {
    return this._valor === id.valor;
  }

  toString(): string {
    return this._valor;
  }
}
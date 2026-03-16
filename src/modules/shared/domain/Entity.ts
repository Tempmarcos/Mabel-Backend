import { Identifier } from './Identifier';

export abstract class Entity<T extends Identifier> {
  protected constructor(
    protected readonly _id: T,
    protected _props: unknown
  ) {}

  get id(): T {
    return this._id;
  }

  equals(entity: Entity<T>): boolean {
    return this._id.equals(entity._id);
  }
}
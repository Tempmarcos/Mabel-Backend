import { Identifier } from './Identifier';

export abstract class Entity<TId extends Identifier, TProps> {
  protected constructor(
    protected readonly _id: TId,
    protected props: TProps
  ) { }

  get id(): TId {
    return this._id;
  }

  equals(entity?: Entity<TId, any>): boolean {
    if (!entity) return false;

    if (this.constructor !== entity.constructor) {
      return false;
    }

    return this._id.equals(entity._id);
  }
}
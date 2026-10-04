import { Scalar } from './Scalar.js';

export abstract class NumericScalar<S extends NumericScalar<S>> extends Scalar<
  number,
  S
> {
  protected constructor(value: number) {
    super(value === 0 ? 0 : value);
  }

  override compareTo(other: S): number {
    return this.value() - other.value();
  }
}

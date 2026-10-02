import { Scalar } from './Scalar.js';

export abstract class NumericScalar<S extends NumericScalar<S>> extends Scalar<
  number,
  S
> {
  override compareTo(other: S): number {
    return this.value() - other.value();
  }
}

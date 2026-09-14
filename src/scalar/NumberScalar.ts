import { Scalar } from './Scalar.js';

export class NumberScalar extends Scalar<number> {
  protected override readonly kind = 'number';

  static of(value: number): NumberScalar {
    if (!Number.isFinite(value))
      throw new RangeError(`Invalid number value: ${String(value)}`);

    return new NumberScalar(value);
  }

  override compareTo(other: NumberScalar): number {
    return this.value() - other.value();
  }

  override toString(): string {
    return String(this.value());
  }
}

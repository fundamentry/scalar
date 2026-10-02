import { Scalar } from './Scalar.js';

export class Number extends Scalar<number, Number> {
  protected override readonly kind = 'number';

  static of(this: void, value: number): Number {
    if (!globalThis.Number.isFinite(value))
      throw new RangeError(`Invalid number value: ${String(value)}`);

    return new Number(value);
  }

  override compareTo(other: Number): number {
    return this.value() - other.value();
  }

  override toString(): string {
    return String(this.value());
  }
}

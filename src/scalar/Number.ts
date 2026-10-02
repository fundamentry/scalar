import { NumericScalar } from './NumericScalar.js';

export class Number extends NumericScalar<Number> {
  protected override readonly kind = 'number';

  static of(this: void, value: number): Number {
    if (!globalThis.Number.isFinite(value))
      throw new RangeError(`Invalid number value: ${String(value)}`);

    return new Number(value);
  }

  override toString(): string {
    return String(this.value());
  }
}

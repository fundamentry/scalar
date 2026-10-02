import { Scalar } from './Scalar.js';

export class Hexadecimal extends Scalar<number, Hexadecimal> {
  protected override readonly kind = 'hexadecimal';

  static of(this: void, value: number): Hexadecimal {
    if (
      !Number.isInteger(value) ||
      value < 0 ||
      value > Number.MAX_SAFE_INTEGER
    )
      throw new RangeError(`Invalid hexadecimal value: ${String(value)}`);

    return new Hexadecimal(value);
  }

  override compareTo(other: Hexadecimal): number {
    return this.value() - other.value();
  }

  override toString(): string {
    return `0x${this.value().toString(16)}`;
  }
}

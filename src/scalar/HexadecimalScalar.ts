import { Scalar } from './Scalar.js';

export class HexadecimalScalar extends Scalar<number> {
  protected override readonly kind = 'hexadecimal';

  static of(this: void, value: number): HexadecimalScalar {
    if (
      !Number.isInteger(value) ||
      value < 0 ||
      value > Number.MAX_SAFE_INTEGER
    )
      throw new RangeError(`Invalid hexadecimal value: ${String(value)}`);

    return new HexadecimalScalar(value);
  }

  override compareTo(other: HexadecimalScalar): number {
    return this.value() - other.value();
  }

  override toString(): string {
    return `0x${this.value().toString(16)}`;
  }
}

export const hexadecimal = HexadecimalScalar.of;

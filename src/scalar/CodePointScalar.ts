import { Scalar } from './Scalar.js';

const isCodePointRange = (value: number): boolean =>
  Number.isInteger(value) && value >= 0 && value <= 0x10ffff;

const isSurrogate = (value: number): boolean =>
  value >= 0xd800 && value <= 0xdfff;

export class CodePointScalar extends Scalar<number> {
  protected override readonly kind = 'codePoint';

  static of(this: void, value: number): CodePointScalar {
    if (!isCodePointRange(value) || isSurrogate(value))
      throw new RangeError(`Invalid code point value: ${String(value)}`);

    return new CodePointScalar(value);
  }

  override compareTo(other: CodePointScalar): number {
    return this.value() - other.value();
  }

  override toString(): string {
    return String.fromCodePoint(this.value());
  }
}

import { Scalar } from './Scalar.js';

const isCodePointRange = (value: number): boolean =>
  Number.isInteger(value) && value >= 0 && value <= 0x10ffff;

const isSurrogate = (value: number): boolean =>
  value >= 0xd800 && value <= 0xdfff;

const codePointFromCharacter = (character: string): number => {
  const codePoint = character.codePointAt(0);

  if (codePoint === undefined || [...character].length !== 1)
    throw new RangeError(
      `Invalid character value: ${JSON.stringify(character)}`
    );

  return codePoint;
};

export class CodePoint extends Scalar<number, CodePoint> {
  protected override readonly kind = 'codePoint';

  static of(this: void, value: number): CodePoint;

  static of(this: void, character: string): CodePoint;

  static of(this: void, value: number | string): CodePoint {
    const codePoint =
      typeof value === 'string' ? codePointFromCharacter(value) : value;

    if (!isCodePointRange(codePoint) || isSurrogate(codePoint))
      throw new RangeError(`Invalid code point value: ${String(codePoint)}`);

    return new CodePoint(codePoint);
  }

  override compareTo(other: CodePoint): number {
    return this.value() - other.value();
  }

  override toString(): string {
    return String.fromCodePoint(this.value());
  }
}

import { describe, expect, it } from 'vitest';

import { HexadecimalScalar } from './HexadecimalScalar.js';

const INVALID_VALUES = [1.5, -1, Number.MAX_SAFE_INTEGER + 1];

const VALID_VALUES = [0, Number.MAX_SAFE_INTEGER];

describe('HexadecimalScalar', () => {
  describe('of', () => {
    it.each(INVALID_VALUES)("must throw for '%s'", value => {
      expect(() => HexadecimalScalar.of(value)).toThrow(
        new RangeError(`Invalid hexadecimal value: ${String(value)}`)
      );
    });

    it.each(VALID_VALUES)("must accept '%s'", value => {
      expect(HexadecimalScalar.of(value).value()).toBe(value);
    });
  });

  describe('value', () => {
    it('must return the wrapped integer', () => {
      expect(HexadecimalScalar.of(255).value()).toBe(255);
    });
  });

  describe('compareTo', () => {
    it.each([
      [-1, 1, 2],
      [0, 2, 2],
      [1, 2, 1],
    ])("must return '%i' for compareTo(%i, %i)", (expected, a, b) => {
      expect(HexadecimalScalar.of(a).compareTo(HexadecimalScalar.of(b))).toBe(
        expected
      );
    });
  });

  describe('toString', () => {
    it.each([
      [255, '0xff'],
      [0, '0x0'],
    ])("must stringify %i as '%s'", (value, expected) => {
      expect(HexadecimalScalar.of(value).toString()).toBe(expected);
    });
  });
});

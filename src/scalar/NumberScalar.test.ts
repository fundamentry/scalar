import { describe, expect, it } from 'vitest';

import { NumberScalar } from './NumberScalar.js';

const INVALID_VALUES = [NaN, Infinity, -Infinity];

describe('NumberScalar', () => {
  describe('of', () => {
    it.each(INVALID_VALUES)("must throw for '%s'", value => {
      expect(() => NumberScalar.of(value)).toThrow(
        new RangeError(`Invalid number value: ${String(value)}`)
      );
    });
  });

  describe('value', () => {
    it('must return the wrapped number', () => {
      expect(NumberScalar.of(5).value()).toBe(5);
    });
  });

  describe('compareTo', () => {
    it.each([
      [-1, 3, 4],
      [0, 4, 4],
      [1, 4, 3],
    ])("must return '%i' for compareTo(%i, %i)", (expected, a, b) => {
      expect(NumberScalar.of(a).compareTo(NumberScalar.of(b))).toBe(expected);
    });
  });

  describe('toString', () => {
    it.each([
      [42, '42'],
      [-7, '-7'],
    ])("must stringify %i as '%s'", (value, expected) => {
      expect(NumberScalar.of(value).toString()).toBe(expected);
    });
  });
});

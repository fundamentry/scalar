import { describe, expect, it } from 'vitest';

import { Number } from './Number.js';

const INVALID_VALUES = [NaN, Infinity, -Infinity];

describe('Number', () => {
  describe('of', () => {
    it.each(INVALID_VALUES)("must throw for '%s'", value => {
      expect(() => Number.of(value)).toThrow(
        new RangeError(`Invalid number value: ${String(value)}`)
      );
    });
  });

  describe('value', () => {
    it('must return the wrapped number', () => {
      expect(Number.of(5).value()).toBe(5);
    });

    it('must normalise -0 to 0', () => {
      expect(Number.of(-0).value()).toBe(0);
    });
  });

  describe('compareTo', () => {
    it.each([
      [-1, 3, 4],
      [0, 4, 4],
      [1, 4, 3],
    ])("must return '%i' for compareTo(%i, %i)", (expected, a, b) => {
      expect(Number.of(a).compareTo(Number.of(b))).toBe(expected);
    });
  });

  describe('equals', () => {
    it.each([
      [true, 4, 4],
      [false, 3, 4],
    ])('must return %s for %i.equals(%i)', (expected, a, b) => {
      expect(Number.of(a).equals(Number.of(b))).toBe(expected);
    });
  });

  describe('toString', () => {
    it.each([
      [42, '42'],
      [-7, '-7'],
    ])("must stringify %i as '%s'", (value, expected) => {
      expect(Number.of(value).toString()).toBe(expected);
    });
  });
});

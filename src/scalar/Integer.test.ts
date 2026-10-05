import { describe, expect, it } from 'vitest';

import { Integer } from './Integer.js';

const INVALID_VALUES = [
  1.5,
  NaN,
  Infinity,
  -Infinity,
  Number.MAX_SAFE_INTEGER + 1,
  Number.MIN_SAFE_INTEGER - 1,
];

const VALID_VALUES = [0, -7, Number.MAX_SAFE_INTEGER, Number.MIN_SAFE_INTEGER];

describe('Integer', () => {
  describe('of', () => {
    it.each(INVALID_VALUES)("must throw for '%s'", value => {
      expect(() => Integer.of(value)).toThrow(
        new RangeError(`Invalid integer value: ${String(value)}`)
      );
    });

    it.each(VALID_VALUES)("must accept '%s'", value => {
      expect(Integer.of(value).value()).toBe(value);
    });
  });

  describe('value', () => {
    it('must return the wrapped integer', () => {
      expect(Integer.of(5).value()).toBe(5);
    });

    it('must normalise -0 to 0', () => {
      expect(Integer.of(-0).value()).toBe(0);
    });
  });

  describe('compareTo', () => {
    it.each([
      [-1, 3, 4],
      [0, 4, 4],
      [1, 4, 3],
    ])("must return '%i' for compareTo(%i, %i)", (expected, a, b) => {
      expect(Integer.of(a).compareTo(Integer.of(b))).toBe(expected);
    });
  });

  describe('equals', () => {
    it.each([
      [true, 4, 4],
      [false, 3, 4],
    ])('must return %s for %i.equals(%i)', (expected, a, b) => {
      expect(Integer.of(a).equals(Integer.of(b))).toBe(expected);
    });
  });

  describe('increment', () => {
    it.each([
      [-1, 0],
      [0, 1],
      [41, 42],
    ])('must increment %i to %i', (value, expected) => {
      expect(Integer.of(value).increment().value()).toBe(expected);
    });

    it('must not mutate the original integer', () => {
      const integer = Integer.of(1);

      integer.increment();

      expect(integer.value()).toBe(1);
    });

    it('must throw past the maximum safe integer', () => {
      expect(() => Integer.of(Number.MAX_SAFE_INTEGER).increment()).toThrow(
        new RangeError(
          `Invalid integer value: ${String(Number.MAX_SAFE_INTEGER + 1)}`
        )
      );
    });
  });

  describe('decrement', () => {
    it.each([
      [1, 0],
      [0, -1],
      [43, 42],
    ])('must decrement %i to %i', (value, expected) => {
      expect(Integer.of(value).decrement().value()).toBe(expected);
    });

    it('must not mutate the original integer', () => {
      const integer = Integer.of(1);

      integer.decrement();

      expect(integer.value()).toBe(1);
    });

    it('must throw past the minimum safe integer', () => {
      expect(() => Integer.of(Number.MIN_SAFE_INTEGER).decrement()).toThrow(
        new RangeError(
          `Invalid integer value: ${String(Number.MIN_SAFE_INTEGER - 1)}`
        )
      );
    });
  });

  describe('toString', () => {
    it.each([
      [42, '42'],
      [-7, '-7'],
    ])("must stringify %i as '%s'", (value, expected) => {
      expect(Integer.of(value).toString()).toBe(expected);
    });
  });
});

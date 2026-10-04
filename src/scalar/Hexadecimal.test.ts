import { describe, expect, it } from 'vitest';

import { Hexadecimal } from './Hexadecimal.js';

const INVALID_VALUES = [1.5, -1, Number.MAX_SAFE_INTEGER + 1];

const VALID_VALUES = [0, Number.MAX_SAFE_INTEGER];

describe('Hexadecimal', () => {
  describe('of', () => {
    it.each(INVALID_VALUES)("must throw for '%s'", value => {
      expect(() => Hexadecimal.of(value)).toThrow(
        new RangeError(`Invalid hexadecimal value: ${String(value)}`)
      );
    });

    it.each(VALID_VALUES)("must accept '%s'", value => {
      expect(Hexadecimal.of(value).value()).toBe(value);
    });
  });

  describe('value', () => {
    it('must return the wrapped integer', () => {
      expect(Hexadecimal.of(255).value()).toBe(255);
    });

    it('must normalise -0 to 0', () => {
      expect(Hexadecimal.of(-0).value()).toBe(0);
    });
  });

  describe('compareTo', () => {
    it.each([
      [-1, 1, 2],
      [0, 2, 2],
      [1, 2, 1],
    ])("must return '%i' for compareTo(%i, %i)", (expected, a, b) => {
      expect(Hexadecimal.of(a).compareTo(Hexadecimal.of(b))).toBe(expected);
    });
  });

  describe('equals', () => {
    it.each([
      [true, 2, 2],
      [false, 1, 2],
    ])('must return %s for %i.equals(%i)', (expected, a, b) => {
      expect(Hexadecimal.of(a).equals(Hexadecimal.of(b))).toBe(expected);
    });
  });

  describe('toString', () => {
    it.each([
      [255, '0xff'],
      [0, '0x0'],
    ])("must stringify %i as '%s'", (value, expected) => {
      expect(Hexadecimal.of(value).toString()).toBe(expected);
    });
  });
});

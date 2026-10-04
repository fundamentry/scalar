import { describe, expect, it } from 'vitest';

import { CodePoint } from './CodePoint.js';

const INVALID_VALUES = [1.5, -1, 0x10ffff + 1, 0xd800, 0xdfff];

const VALID_VALUES = [0, 0x41, 0x10ffff];

describe('CodePoint', () => {
  describe('of', () => {
    describe('given a number', () => {
      it.each(INVALID_VALUES)("must throw for '%s'", value => {
        expect(() => CodePoint.of(value)).toThrow(
          new RangeError(`Invalid code point value: ${String(value)}`)
        );
      });

      it.each(VALID_VALUES)("must accept '%s'", value => {
        expect(CodePoint.of(value).value()).toBe(value);
      });
    });

    describe('given a character', () => {
      it.each(['', 'ab', 'é', '👨‍👩‍👧‍👦'])("must throw for '%s'", character => {
        expect(() => CodePoint.of(character)).toThrow(
          new RangeError(
            `Invalid character value: ${JSON.stringify(character)}`
          )
        );
      });

      it('must throw for a lone surrogate', () => {
        expect(() => CodePoint.of('\ud800')).toThrow(
          new RangeError(`Invalid code point value: ${String(0xd800)}`)
        );
      });

      it.each([
        ['A', 0x41],
        ['😀', 0x1f600],
      ])("must accept '%s'", (character, expected) => {
        expect(CodePoint.of(character).value()).toBe(expected);
      });
    });
  });

  describe('value', () => {
    it('must return the wrapped integer', () => {
      expect(CodePoint.of(0x41).value()).toBe(0x41);
    });

    it('must normalise -0 to 0', () => {
      expect(CodePoint.of(-0).value()).toBe(0);
    });
  });

  describe('compareTo', () => {
    it.each([
      [-1, 1, 2],
      [0, 2, 2],
      [1, 2, 1],
    ])("must return '%i' for compareTo(%i, %i)", (expected, a, b) => {
      expect(CodePoint.of(a).compareTo(CodePoint.of(b))).toBe(expected);
    });
  });

  describe('equals', () => {
    it.each([
      [true, 2, 2],
      [false, 1, 2],
    ])('must return %s for %i.equals(%i)', (expected, a, b) => {
      expect(CodePoint.of(a).equals(CodePoint.of(b))).toBe(expected);
    });
  });

  describe('toString', () => {
    it.each([
      [0x41, 'A'],
      [0x1f600, '😀'],
    ])("must stringify %i as '%s'", (value, expected) => {
      expect(CodePoint.of(value).toString()).toBe(expected);
    });
  });
});

import { describe, expect, it } from 'vitest';

import { CodePointScalar } from './CodePointScalar.js';

const INVALID_VALUES = [1.5, -1, 0x10ffff + 1, 0xd800, 0xdfff];

const VALID_VALUES = [0, 0x41, 0x10ffff];

describe('CodePointScalar', () => {
  describe('of', () => {
    describe('given a number', () => {
      it.each(INVALID_VALUES)("must throw for '%s'", value => {
        expect(() => CodePointScalar.of(value)).toThrow(
          new RangeError(`Invalid code point value: ${String(value)}`)
        );
      });

      it.each(VALID_VALUES)("must accept '%s'", value => {
        expect(CodePointScalar.of(value).value()).toBe(value);
      });
    });

    describe('given a character', () => {
      it.each(['', 'ab', 'é', '👨‍👩‍👧‍👦'])("must throw for '%s'", character => {
        expect(() => CodePointScalar.of(character)).toThrow(
          new RangeError(
            `Invalid character value: ${JSON.stringify(character)}`
          )
        );
      });

      it('must throw for a lone surrogate', () => {
        expect(() => CodePointScalar.of('\ud800')).toThrow(
          new RangeError(`Invalid code point value: ${String(0xd800)}`)
        );
      });

      it.each([
        ['A', 0x41],
        ['😀', 0x1f600],
      ])("must accept '%s'", (character, expected) => {
        expect(CodePointScalar.of(character).value()).toBe(expected);
      });
    });
  });

  describe('value', () => {
    it('must return the wrapped integer', () => {
      expect(CodePointScalar.of(0x41).value()).toBe(0x41);
    });
  });

  describe('compareTo', () => {
    it.each([
      [-1, 1, 2],
      [0, 2, 2],
      [1, 2, 1],
    ])("must return '%i' for compareTo(%i, %i)", (expected, a, b) => {
      expect(CodePointScalar.of(a).compareTo(CodePointScalar.of(b))).toBe(
        expected
      );
    });
  });

  describe('toString', () => {
    it.each([
      [0x41, 'A'],
      [0x1f600, '😀'],
    ])("must stringify %i as '%s'", (value, expected) => {
      expect(CodePointScalar.of(value).toString()).toBe(expected);
    });
  });
});

import { describe, expect, it } from 'vitest';

import { Comparable, Equatable } from '@fundamentry/trait';

import { CodePoint } from './CodePoint.js';
import { Integer } from './Integer.js';

describe('Scalar', () => {
  describe('[Comparable.symbol]', () => {
    it.each([
      [-1, 3, 4],
      [0, 4, 4],
      [1, 4, 3],
    ])("must return '%i' for %i compared to %i", (expected, a, b) => {
      expect(Integer.of(a)[Comparable.symbol](Integer.of(b))).toBe(expected);
    });
  });

  describe('[Equatable.symbol]', () => {
    it.each([
      [true, 4, 4],
      [false, 3, 4],
    ])('must return %s for %i equated to %i', (expected, a, b) => {
      expect(Integer.of(a)[Equatable.symbol](Integer.of(b))).toBe(expected);
    });

    it('must be recognised by Equatable.equals', () => {
      expect(Equatable.equals(Integer.of(4), Integer.of(4))).toBe(true);
    });
  });

  describe('[Symbol.toPrimitive]', () => {
    it('must coerce to the string representation', () => {
      expect(String(CodePoint.of('a'))).toBe('a');
    });
  });
});

import { type Comparable, type Stringable } from '@fundamentry/trait';

export abstract class Scalar<V> implements Comparable<Scalar<V>>, Stringable {
  protected abstract readonly kind: string;

  #value: V;

  protected constructor(value: V) {
    this.#value = value;
  }

  value(): V {
    return this.#value;
  }

  abstract compareTo(other: this): number;

  abstract toString(): string;
}

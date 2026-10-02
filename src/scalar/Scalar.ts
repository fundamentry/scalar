import {
  type Comparable,
  type Equatable,
  type Stringable,
} from '@fundamentry/trait';

export abstract class Scalar<V, S extends Scalar<V, S>>
  implements Comparable<S>, Equatable<S>, Stringable
{
  protected abstract readonly kind: string;

  #value: V;

  protected constructor(value: V) {
    this.#value = value;
  }

  value(): V {
    return this.#value;
  }

  equals(other: S): boolean {
    return this.kind === other.kind && this.compareTo(other) === 0;
  }

  abstract compareTo(other: S): number;

  abstract toString(): string;
}

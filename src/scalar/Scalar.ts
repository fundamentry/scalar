import { type Comparable, type Stringable } from '@fundamentry/trait';

export abstract class Scalar<V, S extends Scalar<V, S>>
  implements Comparable<S>, Stringable
{
  protected abstract readonly kind: string;

  #value: V;

  protected constructor(value: V) {
    this.#value = value;
  }

  value(): V {
    return this.#value;
  }

  abstract compareTo(other: S): number;

  abstract toString(): string;
}

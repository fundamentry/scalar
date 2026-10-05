import { Discrete } from '@fundamentry/trait';

import { NumericScalar } from './NumericScalar.js';

export class Integer
  extends NumericScalar<Integer>
  implements Discrete<Integer>
{
  protected override readonly kind = 'integer';

  static of(this: void, value: number): Integer {
    if (!Number.isSafeInteger(value))
      throw new RangeError(`Invalid integer value: ${String(value)}`);

    return new Integer(value);
  }

  increment(): Integer {
    return Integer.of(this.value() + 1);
  }

  decrement(): Integer {
    return Integer.of(this.value() - 1);
  }

  [Discrete.successor](): Integer {
    return this.increment();
  }

  [Discrete.predecessor](): Integer {
    return this.decrement();
  }

  override toString(): string {
    return String(this.value());
  }
}

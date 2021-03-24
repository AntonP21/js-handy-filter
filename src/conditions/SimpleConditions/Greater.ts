import { SimpleCondition } from 'conditions/SimpleConditions';
import { TypeError } from 'conditions/errors';
import { SimpleValue } from 'conditions/types';
import { isNull } from 'conditions/lib/type-guards';

/**
 * The class for the condition "greater than".
 */
export default class Greater extends SimpleCondition {
  /**
   * The method for validating the condition.
   *
   * @param value - The value to validation;
   */
  validate(value: SimpleValue): boolean {
    if (isNull(value) || isNull(this.value)) {
      throw new TypeError('Null cannot be checked by condition "greater than"');
    }

    return value > this.value;
  }
}

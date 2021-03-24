import { SimpleCondition } from 'conditions/SimpleConditions';
import { TypeError } from 'conditions/errors';
import { SimpleValue } from 'conditions/types';
import { isNull } from 'conditions/lib/type-guards';

/**
 * The class for the condition "greater or equal than".
 */
export default class GreaterOrEqual extends SimpleCondition {
  /**
   * The method for validating the condition.
   *
   * @param value - The value to validation;
   */
  protected validate(value: SimpleValue): boolean {
    if (isNull(value) || isNull(this.value)) {
      throw new TypeError('Null cannot be checked by condition "greater or equal than"');
    }

    return value >= this.value;
  }
}

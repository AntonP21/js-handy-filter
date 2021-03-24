import { SimpleCondition } from 'conditions/SimpleConditions';
import { SimpleValue } from 'conditions/types';

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
    return value > this.value;
  }
}

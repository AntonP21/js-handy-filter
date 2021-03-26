import { SimpleValue } from '../../types';

import SimpleCondition from './SimpleCondition';

/**
 * The class for the condition "equal".
 */
export default class Equal extends SimpleCondition {
  /**
   * The method for validating the condition.
   *
   * @param value - The value to validation;
   */
  protected validate(value: SimpleValue): boolean {
    return value === this.value;
  }
}

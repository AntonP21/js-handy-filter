import { isDate } from '../../lib/type-guards';
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
    const { value: limit } = this;

    if (isDate(value) && isDate(limit)) {
      return value.getTime() === limit.getTime();
    }

    return value === limit;
  }
}

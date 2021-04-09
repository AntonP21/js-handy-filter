import { SimpleValue } from '../../types';

import RangeCondition from './RangeCondition';

/**
 * The class for the "in" condition.
 */
export default class In extends RangeCondition {
  /**
   * The method for validating the condition.
   *
   * @param value - The value to validation;
   */
  protected validate(value: SimpleValue): boolean {
    if (value instanceof Date) {
      const dates = [];

      for (const val of this.value) {
        if (val instanceof Date) {
          dates.push(val.getTime());
        }
      }

      return dates.includes(value.getTime());
    }

    return this.value.includes(value);
  }
}

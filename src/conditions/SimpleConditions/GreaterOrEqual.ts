import { TypeError } from '../errors';
import { SimpleValue } from '../types';
import { isNull } from '../lib/type-guards';

import SimpleCondition from './SimpleCondition';

/**
 * The class for the condition "greater than or equal".
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

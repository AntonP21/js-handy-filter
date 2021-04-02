import { SimpleValue } from '../../types';

import RegExpCondition from './RegExpCondition';

/**
 * The class for the condition "contain".
 *
 * NOTE: The "Contain" condition class automatically converts
 *  the checkable value to a string.
 */
export default class Contain extends RegExpCondition {
  /**
   * The method for validating the condition.
   *
   * @param value - The value to validation;
   */
  protected validate(value: SimpleValue): boolean {
    return this.re.test(String(value));
  }
}

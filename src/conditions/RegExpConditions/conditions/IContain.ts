import { RegExpValue } from 'conditions/types';

import RegExpCondition from './RegExpCondition';

/**
 * The class for the condition "ignore case contain".
 *
 * NOTE: The "ignore case contain" condition class automatically converts
 *  the checkable value to a string.
 */
export default class IContain extends RegExpCondition {
  /**
   * The getter for regexp flags.
   * @protected
   */
  protected get flags(): string {
    return 'i';
  }

  /**
   * The method for parsing condition value.
   * @protected
   */
  protected parseValue(value: RegExpValue): [RegExpValue, boolean] {
    const parsed = super.parseValue(value);
    const parsedValue = parsed[0];

    if (typeof parsedValue === 'string') {
      parsed[0] = parsedValue.toLowerCase();
    }

    return parsed;
  }

  /**
   * The method for validating the condition.
   *
   * @param value - The value to validation;
   */
  protected validate(value: string): boolean {
    const condition = this.value;

    if (typeof condition === 'string') {
      return value.toLowerCase().includes(condition);
    }

    return condition.test(value);
  }
}

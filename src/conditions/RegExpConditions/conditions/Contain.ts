import RegExpCondition from './RegExpCondition';

/**
 * The class for the condition "contain".
 */
export default class Contain extends RegExpCondition {
  /**
   * The method for validating the condition.
   *
   * @param value - The value to validation;
   */
  protected validate(value: string): boolean {
    const condition = this.value;

    if (typeof condition === 'string') {
      return value.includes(condition);
    }

    return condition.test(value);
  }
}

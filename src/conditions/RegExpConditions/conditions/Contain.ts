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
    return this.re.test(value);
  }
}

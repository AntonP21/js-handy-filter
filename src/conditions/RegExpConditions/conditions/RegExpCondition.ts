import { TypeError } from '../../errors';
import { CheckableValue, ICondition, RegExpValue } from '../../types';
import { isAnyObject, isSimpleValue } from '../../lib/type-guards';
import { getValue } from '../../lib/utils';

/**
 * The base class for regexp conditions.
 */
export default abstract class RegExpCondition implements ICondition {
  readonly field?: string;
  readonly re: RegExp;
  readonly isAlwaysTrue: boolean;

  /**
   * The presence of the "field" parameter means
   *  that the check will be performed for Object.
   */
  constructor(value: RegExpValue);
  constructor(field: string, value: RegExpValue);
  constructor(field: string | RegExpValue, value?: RegExpValue) {
    if (value !== undefined) {
      if (field !== '') {
        this.field = field as string;
      }

      this.re = new RegExp(value, this.flags);
    } else {
      this.re = new RegExp(field, this.flags);
    }

    this.isAlwaysTrue = this.re.source === '__any__';
  }

  check = (value: CheckableValue) => {
    if (this.isAlwaysTrue) {
      return true;
    }

    if (this.field) {
      if (isAnyObject(value)) {
        return this.validate(getValue(value, this.field));
      }

      throw new TypeError(`Value ${value} must be an object`);
    }

    if (isSimpleValue(value)) {
      return this.validate(value);
    }

    throw new TypeError(`Type of ${value} must be SimpleValue`);
  };

  /**
   * The getter for regexp flags.
   * @protected
   */
  protected get flags(): string | undefined {
    return undefined;
  }

  /**
   * The method for validating a value by condition.
   *
   * @param value - Value to validate;
   * @protected
   */
  protected abstract validate(value: CheckableValue): boolean;
}

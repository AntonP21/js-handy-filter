import { TypeError } from '../../errors';
import { CheckableValue, ICondition, RegExpValue } from '../../types';
import { ANY } from '../../lib/constants';
import { isAnyObject, isSimpleValue } from '../../lib/type-guards';
import { getValue } from '../../lib/utils';

/**
 * The base class for regexp conditions.
 *
 * NOTE: RegExp conditions automatically convert all values to string type.
 */
export default abstract class RegExpCondition implements ICondition {
  readonly field?: string;
  readonly value: RegExpValue;
  readonly isAlwaysTrue: boolean;
  readonly isAlwaysFalse: boolean = false;

  /**
   * The presence of the "field" parameter means
   *  that the check will be performed for Object.
   */
  constructor(value: RegExpValue);
  constructor(field: string, value: RegExpValue);
  constructor(field: RegExpValue, value?: RegExpValue) {
    let parsed;

    if (value !== undefined) {
      if (field !== '') {
        this.field = field as string;
      }

      parsed = this.parseValue(value);
    } else {
      parsed = this.parseValue(field);
    }

    this.value = parsed[0];
    this.isAlwaysTrue = parsed[1];
  }

  check = (value: CheckableValue) => {
    if (this.isAlwaysTrue) {
      return true;
    }

    if (this.field) {
      if (isAnyObject(value)) {
        return this.validate(String(getValue(value, this.field)));
      }

      throw new TypeError(`Value ${value} must be an object`);
    }

    if (isSimpleValue(value)) {
      return this.validate(String(value));
    }

    throw new TypeError(`Type of ${value} must be SimpleValue`);
  };

  /**
   * The getter for regexp flags.
   * @protected
   */
  protected get flags(): string {
    return '';
  }

  /**
   * The method for parsing condition value.
   * @protected
   */
  protected parseValue(value: RegExpValue): [RegExpValue, boolean] {
    if (typeof value === 'string') {
      return [value, value === ANY];
    }

    if (value instanceof RegExp) {
      return [new RegExp(value, value.flags + this.flags), value.source === ANY];
    }

    throw new TypeError(`A value for RegExpCondition must be string or RegExp not ${typeof value}`);
  }

  /**
   * The method for validating a value by condition.
   *
   * @param value - Value to validate;
   * @protected
   */
  protected abstract validate(value: string): boolean;
}

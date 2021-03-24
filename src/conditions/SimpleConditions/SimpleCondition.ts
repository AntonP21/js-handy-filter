import { TypeError } from 'conditions/errors';
import { CheckableValue, Condition, SimpleValue } from 'conditions/types';
import { isAnyObject, isSimpleValue } from 'conditions/lib/type-guards';
import { getValue } from 'conditions/lib/utils';

/**
 * The base class for simple conditions.
 */
export default abstract class SimpleCondition implements Condition {
  readonly field?: string;
  readonly value: SimpleValue;

  /**
   * The presence of the "field" parameter means
   *  that the check will be performed for Object.
   */
  constructor(value: SimpleValue);
  constructor(field: string, value: SimpleValue);
  constructor(field: string | SimpleValue, value?: SimpleValue) {
    if (value !== undefined) {
      this.field = field as string;
      this.value = value;
    } else {
      this.value = field;
    }
  }

  abstract validate(value: SimpleValue): boolean;

  check = (value: CheckableValue) => {
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
}

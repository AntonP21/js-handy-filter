import { TypeError } from '../../errors';
import { CheckableValue, ICondition, SimpleRange, SimpleValue } from '../../types';
import { isAnyObject, isSimpleValue } from '../../lib/type-guards';
import { getValue } from '../../lib/utils';

/**
 * The base class for range conditions.
 */
export default abstract class RangeCondition implements ICondition {
  readonly field?: string;
  readonly value: SimpleRange;
  readonly isAlwaysTrue: boolean;

  /**
   * The presence of the "field" parameter means
   *  that the check will be performed for Object.
   */
  constructor(value: SimpleRange);
  constructor(field: string, value: SimpleRange);
  constructor(field: string | SimpleRange, value?: SimpleRange) {
    if (value !== undefined) {
      if (field !== '') {
        this.field = field as string;
      }

      this.value = value;
    } else {
      this.value = field as SimpleValue[];
    }

    this.isAlwaysTrue = this.value === '__any__';
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
   * The method for validating a value by condition.
   *
   * @param value - Value to validate;
   * @protected
   */
  protected abstract validate(value: CheckableValue): boolean;
}

import { TypeError } from '../../errors';
import { CheckableValue, ICondition, SimpleValue } from '../../types';
import { ANY } from '../../lib/constants';
import { isAnyObject, isSimpleValue } from '../../lib/type-guards';
import { getValue } from '../../lib/utils';

/**
 * The base class for range conditions.
 */
export default abstract class RangeCondition implements ICondition {
  readonly field?: string;
  readonly value: SimpleValue[] = [];
  readonly isAlwaysTrue: boolean = false;
  readonly isAlwaysFalse: boolean = false;

  /**
   * The presence of the "field" parameter means
   *  that the check will be performed for Object.
   */
  constructor(value: SimpleValue[] | typeof ANY);
  constructor(field: string, value: SimpleValue[] | typeof ANY);
  constructor(field: string | SimpleValue[], value?: SimpleValue[] | typeof ANY) {
    let rawValue;

    if (value !== undefined) {
      if (field !== '') {
        this.field = field as string;
      }

      rawValue = value;
    } else {
      rawValue = field as SimpleValue[];
    }

    if (rawValue === '__any__') {
      this.isAlwaysTrue = true;
    } else if (rawValue.length === 0) {
      this.isAlwaysFalse = true;
    } else {
      this.value = rawValue;
    }
  }

  check = (value: CheckableValue) => {
    if (this.isAlwaysTrue) {
      return true;
    }

    if (this.isAlwaysFalse) {
      return false;
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
  protected abstract validate(value: SimpleValue): boolean;
}

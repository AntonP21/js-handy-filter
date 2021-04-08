import ConditionParser from 'condition-parser';
import { CheckableValue, Condition, ICondition } from '../../types';

/**
 * The base class for logical conditions.
 */
export default abstract class LogicalCondition implements ICondition {
  protected conditions: ICondition[] = [];
  private _isAlwaysTrue: boolean = false;
  private _isAlwaysFalse: boolean = false;

  constructor(...args: Condition[]) {
    if (args.length !== 0) {
      this.conditions = this.optimise(ConditionParser.parse(args));
    } else {
      this._isAlwaysTrue = true;
    }
  }

  /**
   * The method for setting the isAlwaysTrue value.
   */
  protected setIsAlwaysTrue = (newValue: boolean) => {
    if (newValue) {
      this._isAlwaysFalse = false;
    }

    this._isAlwaysTrue = newValue;
  };

  /**
   * The method for setting the isAlwaysTrue value.
   */
  protected setIsAlwaysFalse = (newValue: boolean) => {
    if (newValue) {
      this._isAlwaysTrue = false;
    }

    this._isAlwaysFalse = newValue;
  };

  /**
   * Getter for the value isAlwaysTrue.
   *
   * NOTE: He is needed for child classes can set their own value.
   */
  get isAlwaysTrue() {
    return this._isAlwaysTrue;
  }

  /**
   * Getter for the value isAlwaysFalse.
   *
   * NOTE: He is needed for child classes can set their own value.
   */
  get isAlwaysFalse() {
    return this._isAlwaysFalse;
  }

  check = (value: CheckableValue): boolean => {
    if (this._isAlwaysTrue) {
      return true;
    }

    if (this._isAlwaysFalse) {
      return false;
    }

    return this.validate(value);
  };

  /**
   * The method for optimising received conditions.
   *
   * @param conditions - Conditions to optimise;
   * @protected
   */
  protected optimise(conditions: ICondition[]) {
    return conditions;
  }

  /**
   * The method for validating a value by condition.
   *
   * @param value - Value to validate;
   * @protected
   */
  protected abstract validate(value: CheckableValue): boolean;
}

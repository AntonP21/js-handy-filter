import ConditionParser from 'condition-parser';
import { CheckableValue, Condition, ICondition } from '../../types';

/**
 * The base class for logical conditions.
 */
export default abstract class LogicalCondition implements ICondition {
  protected conditions: ICondition[] = [];
  readonly isAlwaysTrue: boolean = false;

  constructor(...args: Condition[]) {
    if (args.length !== 0) {
      this.conditions = this.optimise(ConditionParser.parse(args));
    }

    if (this.conditions.length === 0) {
      this.isAlwaysTrue = true;
    }
  }

  check = (value: CheckableValue): boolean => (
    this.isAlwaysTrue || this.validate(value)
  );

  /**
   * The method for optimising received conditions.
   *
   * @param conditions - Conditions to optimise;
   * @protected
   */
  protected optimise = (conditions: ICondition[]) => conditions;

  /**
   * The method for validating a value by condition.
   *
   * @param value - Value to validate;
   * @protected
   */
  protected abstract validate(value: CheckableValue): boolean;
}

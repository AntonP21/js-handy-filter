import { CheckableValue, Condition, ICondition } from 'conditions/types';
import ConditionParser from 'conditions/ConditionParser';

/**
 * The base class for logical conditions.
 */
export default abstract class LogicalCondition implements ICondition {
  protected conditions: ICondition[];

  protected constructor(...args: Condition[]) {
    this.conditions = ConditionParser.parse(args);
  }

  abstract check(value: CheckableValue): boolean;
}

import ConditionParser from '../ConditionParser';
import { CheckableValue, Condition, ICondition } from '../types';

/**
 * The base class for logical conditions.
 */
export default abstract class LogicalCondition implements ICondition {
  protected conditions: ICondition[];

  constructor(...args: Condition[]) {
    this.conditions = ConditionParser.parse(args);
  }

  abstract check(value: CheckableValue): boolean;
}

import LogicalCondition from './LogicalCondition';

import { CheckableValue, ICondition } from '../../types';

/**
 * The class for the "AND" condition.
 */
export default class And extends LogicalCondition {
  protected optimise = (conditions: ICondition[]) => conditions.filter((condition) => (
    !condition.isAlwaysTrue
  ));

  protected validate = (value: CheckableValue): boolean => this.conditions.every((condition) => (
    condition.check(value)
  ));
}

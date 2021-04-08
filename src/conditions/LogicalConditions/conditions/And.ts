import LogicalCondition from './LogicalCondition';

import { CheckableValue, ICondition } from '../../types';

/**
 * The class for the "AND" condition.
 */
export default class And extends LogicalCondition {
  /**
   * The method for optimising received conditions.
   *
   * @param conditions - Conditions to optimise;
   * @protected
   */
  protected optimise(conditions: ICondition[]) {
    if (conditions.some((condition) => condition.isAlwaysFalse)) {
      this.setIsAlwaysFalse(true);
      return [];
    }

    const optimisedConditions = conditions.filter((condition) => (
      !condition.isAlwaysTrue
    ));

    if (optimisedConditions.length === 0) {
      this.setIsAlwaysTrue(true);
      return [];
    }

    return optimisedConditions;
  }

  protected validate = (value: CheckableValue): boolean => this.conditions.every((condition) => (
    condition.check(value)
  ));
}

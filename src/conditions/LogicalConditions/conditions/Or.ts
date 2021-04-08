import LogicalCondition from './LogicalCondition';

import { CheckableValue, ICondition } from '../../types';

/**
 * The class for "OR" condition.
 */
export default class Or extends LogicalCondition {
  /**
   * The method for optimising received conditions.
   *
   * @param conditions - Conditions to optimise;
   * @protected
   */
  protected optimise(conditions: ICondition[]) {
    if (conditions.some((condition) => condition.isAlwaysTrue)) {
      this.setIsAlwaysTrue(true);
      return [];
    }

    const optimisedConditions = conditions.filter((condition) => (
      !condition.isAlwaysFalse
    ));

    if (optimisedConditions.length === 0) {
      this.setIsAlwaysFalse(true);
      return [];
    }

    return optimisedConditions;
  }

  protected validate = (value: CheckableValue): boolean => this.conditions.some((condition) => (
    condition.check(value)
  ));
}

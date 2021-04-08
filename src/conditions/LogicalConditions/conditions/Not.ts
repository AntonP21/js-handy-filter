import LogicalCondition from './LogicalCondition';

import { CheckableValue, ICondition } from '../../types';

/**
 * The class for "NOT" condition.
 *
 * NOTE: Unlike other logical conditions the NOT work with only one condition.
 */
export default class Not extends LogicalCondition {
  /**
   * The method for optimising received conditions.
   *
   * @param conditions - Conditions to optimise;
   * @protected
   */
  protected optimise(conditions: ICondition[]) {
    const [condition] = conditions;
    if (condition.isAlwaysTrue) {
      this.setIsAlwaysFalse(true);
    } else if (condition.isAlwaysFalse) {
      this.setIsAlwaysTrue(true);
    }

    return conditions;
  }

  protected validate = (value: CheckableValue): boolean => (
    !this.conditions[0].check(value)
  );
}

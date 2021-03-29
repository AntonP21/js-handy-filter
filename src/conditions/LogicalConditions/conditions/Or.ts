import LogicalCondition from './LogicalCondition';

import { CheckableValue, ICondition } from '../../types';

/**
 * The class for "OR" condition.
 */
export default class Or extends LogicalCondition {
  protected optimise = (conditions: ICondition[]) => {
    for (const condition of conditions) {
      if (condition.isAlwaysTrue) {
        return [];
      }
    }

    return conditions;
  };

  protected validate = (value: CheckableValue): boolean => this.conditions.some((condition) => (
    condition.check(value)
  ));
}

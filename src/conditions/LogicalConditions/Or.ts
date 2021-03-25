import LogicalCondition from './LogicalCondition';

import { CheckableValue } from '../types';

/**
 * The class for "OR" condition.
 */
export default class Or extends LogicalCondition {
  check = (value: CheckableValue): boolean => this.conditions.some((condition) => (
    condition.check(value)
  ));
}

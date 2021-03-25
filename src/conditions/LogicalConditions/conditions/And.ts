import LogicalCondition from './LogicalCondition';

import { CheckableValue } from '../../types';

/**
 * The class for "AND" condition.
 */
export default class And extends LogicalCondition {
  check = (value: CheckableValue): boolean => this.conditions.every((condition) => (
    condition.check(value)
  ));
}

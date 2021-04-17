import { ICondition } from '../../types';

import And from '../conditions/And';
import Not from '../conditions/Not';
import Or from '../conditions/Or';

/**
 * The alias for the "and" condition.
 */
export const and = (...values: ICondition[]) => (
  new And(...values)
);

/**
 * The alias for the "not" condition.
 */
export const not = (value: ICondition) => (
  new Not(value)
);

/**
 * The alias for the "or" condition.
 */
export const or = (...values: ICondition[]) => (
  new Or(...values)
);

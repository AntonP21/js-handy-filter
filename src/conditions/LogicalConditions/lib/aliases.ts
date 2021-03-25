import And from '../conditions/And';
import Or from '../conditions/Or';
import { LogicalConditionConstructor } from '../types';

/**
 * The alias for "and" condition.
 */
export const and = (...values: ConstructorParameters<LogicalConditionConstructor>) => (
  new And(...values)
);

/**
 * The alias for "or" condition.
 */
export const or = (...values: ConstructorParameters<LogicalConditionConstructor>) => (
  new Or(...values)
);

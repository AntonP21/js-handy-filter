import Or from './Or';
import { LogicalConditionConstructor } from './types';

/**
 * The alias for "or" condition.
 */
export const or = (...values: ConstructorParameters<LogicalConditionConstructor>) => (
  new Or(...values)
);

import { SimpleConditionConstructor } from '../types';

import Greater from '../conditions/Greater';
import GreaterOrEqual from '../conditions/GreaterOrEqual';

/**
 * The alias for "greater than" condition.
 */
export const gt = (...values: ConstructorParameters<SimpleConditionConstructor>) => (
  // There is the TypeScript bug. See - https://github.com/microsoft/TypeScript/issues/28010
  // @ts-ignore
  new Greater(...values)
);

/**
 * The alias for "greater than or equal" condition.
 */
export const gte = (...values: ConstructorParameters<SimpleConditionConstructor>) => (
  // There is the TypeScript bug. See - https://github.com/microsoft/TypeScript/issues/28010
  // @ts-ignore
  new GreaterOrEqual(...values)
);

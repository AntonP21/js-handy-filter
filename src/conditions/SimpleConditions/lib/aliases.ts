import { ConditionConstructor, SimpleValue } from '../../types';

import Equal from '../conditions/Equal';
import Greater from '../conditions/Greater';
import GreaterOrEqual from '../conditions/GreaterOrEqual';
import Less from '../conditions/Less';
import LessOrEqual from '../conditions/LessOrEqual';
import SimpleCondition from '../conditions/SimpleCondition';

type Values = ConstructorParameters<ConditionConstructor<SimpleCondition, SimpleValue>>;

/**
 * The alias for "equal" condition.
 */
export const eq = (...values: Values) => (
  // There is the TypeScript bug. See - https://github.com/microsoft/TypeScript/issues/28010
  // @ts-ignore
  new Equal(...values)
);

/**
 * The alias for "greater than" condition.
 */
export const gt = (...values: Values) => (
  // There is the TypeScript bug. See - https://github.com/microsoft/TypeScript/issues/28010
  // @ts-ignore
  new Greater(...values)
);

/**
 * The alias for "greater than or equal" condition.
 */
export const gte = (...values: Values) => (
  // There is the TypeScript bug. See - https://github.com/microsoft/TypeScript/issues/28010
  // @ts-ignore
  new GreaterOrEqual(...values)
);

/**
 * The alias for "less than" condition.
 */
export const lt = (...values: Values) => (
  // There is the TypeScript bug. See - https://github.com/microsoft/TypeScript/issues/28010
  // @ts-ignore
  new Less(...values)
);

/**
 * The alias for "less than or equal" condition.
 */
export const lte = (...values: Values) => (
  // There is the TypeScript bug. See - https://github.com/microsoft/TypeScript/issues/28010
  // @ts-ignore
  new LessOrEqual(...values)
);

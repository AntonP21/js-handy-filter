import { ANY } from 'conditions/lib/constants';
import { ConditionConstructor, SimpleValue } from 'conditions/types';

import In from '../conditions/In';
import RangeCondition from '../conditions/RangeCondition';

type Values = ConstructorParameters<ConditionConstructor<RangeCondition, SimpleValue[] | typeof ANY>>;

/**
 * The alias for the "in list" condition.
 */
export const inl = (...values: Values) => (
  // There is the TypeScript bug. See - https://github.com/microsoft/TypeScript/issues/28010
  // @ts-ignore
  new In(...values)
);

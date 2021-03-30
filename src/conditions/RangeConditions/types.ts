import { SimpleRange } from '../types';

import RangeCondition from './conditions/RangeCondition';

export type RangeConditionConstructor = (
  (new(value: SimpleRange) => RangeCondition) |
  (new(field: string, value: SimpleRange) => RangeCondition)
);

// This interface is needed because TypeScript has the bug - https://github.com/microsoft/TypeScript/issues/28010
export interface IRangeConditionConstructor {
  new(value: SimpleRange): RangeCondition;
  new(field: string, value: SimpleRange): RangeCondition;
}

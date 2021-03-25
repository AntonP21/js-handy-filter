import { SimpleValue } from '../types';

import SimpleCondition from './conditions/SimpleCondition';

export type SimpleConditionConstructor = (
  (new(value: SimpleValue) => SimpleCondition) |
  (new(field: string, value: SimpleValue) => SimpleCondition)
);

// This interface is needed because TypeScript has the bug - https://github.com/microsoft/TypeScript/issues/28010
export interface ISimpleConditionConstructor {
  new(value: SimpleValue): SimpleCondition;
  new(field: string, value: SimpleValue): SimpleCondition;
}

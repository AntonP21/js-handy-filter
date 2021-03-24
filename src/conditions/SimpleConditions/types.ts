import { SimpleValue } from 'conditions/types';

import SimpleCondition from './SimpleCondition';

export interface SimpleConditionConstructor {
  new(value: SimpleValue): SimpleCondition;
  new(field: string, value: SimpleValue): SimpleCondition;
}

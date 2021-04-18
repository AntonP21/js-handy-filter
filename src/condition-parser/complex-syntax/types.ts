import { RegExpValue, SimpleValue } from 'conditions/types';

import { CONDITION_MAP, LOGICAL_CONDITION_MAP } from './lib/constants';

export type ConditionKey = keyof typeof CONDITION_MAP;

export type LogicalConditionKey = keyof typeof LOGICAL_CONDITION_MAP;

export type ComplexCondition = (
  Array<ConditionKey | LogicalConditionKey | SimpleValue | SimpleValue[] | RegExpValue | ComplexCondition>
);

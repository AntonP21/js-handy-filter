import { Condition } from '../types';

import LogicalCondition from './conditions/LogicalCondition';

export type LogicalConditionConstructor = (
  new(...args: Condition[]) => LogicalCondition
);

import { Condition } from '../types';

import LogicalCondition from './LogicalCondition';

export type LogicalConditionConstructor = (
  new(...args: Condition[]) => LogicalCondition
);

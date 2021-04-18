import { ICondition, RegExpValue, SimpleValue } from 'conditions/types';

export type Alias<Type = any> = (...args: Type[]) => ICondition;

export type NodeValue = (
  Alias<ICondition> | Alias<RegExpValue> | Alias<SimpleValue> | RegExpValue | SimpleValue | SimpleValue[]
);

export type NodeType = 'condition' | 'and' | 'or' | 'terminal';

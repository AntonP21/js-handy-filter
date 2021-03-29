export type SimpleValue = bigint | boolean | null | number | string | undefined | '__any__';

export type CheckableValue = SimpleValue | AnyObject;

export interface AnyObject {
  [key: string]: CheckableValue,
}

export interface ICondition {
  check: (value: CheckableValue) => boolean,
  readonly isAlwaysTrue: boolean;
}

export type SimpleConditionKey = 'eq' | 'gt' | 'gte' | 'lt' | 'lte' | 'ne';

export type StringCondition = `${string}__${SimpleConditionKey}` | SimpleConditionKey;

export type PlainCondition = [StringCondition, SimpleValue];

export type Condition = ICondition | PlainCondition;

export type SimpleValue = string | number | boolean | bigint | null;

export type CheckableValue = SimpleValue | AnyObject;

export interface AnyObject {
  [key: string]: CheckableValue,
}

export interface ICondition {
  check: (value: CheckableValue) => boolean,
}

export type SimpleConditionKey = (
  'gt' |
  'gte'
);

export type StringCondition = `${string}__${SimpleConditionKey}` | SimpleConditionKey;

export type PlainCondition = [StringCondition, SimpleValue];

export type Condition = ICondition | PlainCondition;

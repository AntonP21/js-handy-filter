export type SimpleValue = bigint | boolean | Date | null | number | string | undefined;

export type SimpleRange = SimpleValue[] | '__any__';

export type RegExpValue = RegExp | string;

export type CheckableValue = SimpleValue | AnyObject;

export interface AnyObject {
  [key: string]: CheckableValue,
}

export interface ICondition {
  check: (value: CheckableValue) => boolean,
  readonly isAlwaysTrue: boolean;
}

export type SimpleConditionKey = 'eq' | 'gt' | 'gte' | 'lt' | 'lte' | 'ne';

export type RegExpConditionKey = 'ctn' | 'ictn';

export type ConditionKey = SimpleConditionKey | RegExpConditionKey;

export type StringCondition = `${string}__${ConditionKey}` | ConditionKey;

export type PlainCondition<Type> = [StringCondition, Type];

export type Condition = ICondition | PlainCondition<SimpleValue | RegExpValue>;

export type ConditionConstructor<ClassType, ValueType> = (
  (new(value: ValueType) => ClassType) |
  (new(field: string, value: ValueType) => ClassType)
);

export type SimpleValue = bigint | boolean | Date | null | number | string | undefined;

export type RegExpValue = RegExp | string;

export type CheckableValue = SimpleValue | AnyObject;

export interface AnyObject {
  [key: string]: CheckableValue;
}

export interface ICondition {
  check: (value: CheckableValue) => boolean;
  readonly isAlwaysTrue: boolean;
  readonly isAlwaysFalse: boolean;
}

export type Condition = ICondition;

export type ConditionConstructor<ClassType, ValueType> = (
  (new(value: ValueType) => ClassType) |
  (new(field: string, value: ValueType) => ClassType)
);

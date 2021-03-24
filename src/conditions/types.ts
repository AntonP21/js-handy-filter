export type SimpleValue = string | number | boolean | bigint | null;

export type CheckableValue = SimpleValue | AnyObject;

export interface AnyObject {
  [key: string]: CheckableValue,
}

export interface Condition {
  check: (value: CheckableValue) => boolean,
}

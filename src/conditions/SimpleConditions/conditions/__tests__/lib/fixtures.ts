export const VALUES_GREATER_THAN_LIMIT: [any, any][] = [
  [1001n, 1000n],
  [true, false],
  [new Date(2000, 1, 2), new Date(2000, 1, 1)],
  [101, 100],
  ['foo', 'bar'],
];

export const VALUES_LESS_THAN_LIMIT: [any, any][] = [
  [1000n, 1100n],
  [false, true],
  [new Date(1980, 1, 1), new Date(2000, 1, 2)],
  [100, 101],
  ['bar', 'foo'],
];

export const VALUES_EQUAL_TO_LIMIT: [any, any][] = [
  [1000n, 1000n],
  [false, false],
  [true, true],
  [new Date(1980, 1, 1), new Date(1980, 1, 1)],
  [101, 101],
  ['foo', 'foo'],
];

export const NON_NULLABLE_SIMPLE_VALUES: [any][] = [
  [1001n],
  [true],
  [false],
  [new Date(2000, 1, 2)],
  [101],
  ['foo'],
];

export const SIMPLE_VALUES: [any][] = [
  ...NON_NULLABLE_SIMPLE_VALUES,
  [null],
  [undefined],
];

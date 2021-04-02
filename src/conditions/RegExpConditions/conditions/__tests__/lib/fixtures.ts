export const VALUES_CONTAINING_CONDITIONS: [any, any][] = [
  ['foo', /foo/],
  ['start foo bar', /foo/],
  ['start fooooo bar', /foo/],
  ['start foo', /foo$/],
  ['start foo', 'foo'],
  [123, '3'],
  [123, /^12/],
  [123n, /2/],
  [null, 'null'],
  [undefined, 'undefined'],
  [true, 'true'],
  [false, 'false'],
];

export const CASE_SENSITIVE_VALUES: [any, any][] = [
  ['fOo', /Foo/],
  ['start FoO bar', /fOo/],
  ['start fOOOOO bar', /foo/],
  ['start FOO', /foo$/],
  ['start Foo', 'fOO'],
  [null, 'NuLl'],
  [undefined, 'UndeFiNed'],
  [true, 'tRUe'],
  [false, 'FaLsE'],
];

export const VALUES_NOT_CONTAINING_CONDITIONS: [any, any][] = [
  ['foo', /bar/],
  ['start foo bar', /foooooo/],
  ['start fooooo bar', /some/],
  ['start foo', /^foo/],
  ['start foo', 'bar'],
  [123, '4'],
  [5123, /^123/],
  [123n, /4/],
];

export const SIMPLE_VALUES: [any][] = [
  [1001n],
  [true],
  [false],
  [new Date(2000, 1, 2)],
  [101],
  ['foo'],
  [null],
  [undefined],
];

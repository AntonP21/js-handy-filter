export const ARRAY_WITHOUT_ANY_CORRECT_RECORDS = [
  { num: 1001, str: 'something', bool: true, float: 221.52, null: null, bigint: 101n, obj: { num: 499 } },
  { num: 999, str: 'something', bool: true, float: 221.53, null: 'not null', bigint: 10n, obj: { num: 501 } },
  { num: 999, str: 'something', bool: false, float: 221.53, null: 'not null', bigint: 10n, obj: { num: 500 } },
  { num: 999, str: 'str', bool: false, float: 221.52, null: 'not null', bigint: 10n, obj: { num: 500 } },
  { num: 999, str: 'str', bool: false, float: 222.2, null: 'not null', bigint: 10n, obj: { num: 5000 } },
];

export const ARRAY_WITH_ONE_CORRECT_RECORD = [
  ...ARRAY_WITHOUT_ANY_CORRECT_RECORDS,
  { num: 999, str: 'something', bool: true, float: 222.2, null: 'not null', bigint: 10n, obj: { num: 500 } },
];

export const ARRAY_WITH_FOUR_CORRECT_RECORD = [
  ...ARRAY_WITH_ONE_CORRECT_RECORD,
  { num: 999, str: 'str', bool: true, float: 22.2, null: 'not null', bigint: 10n, obj: { num: 5000 } },
  { num: 999, str: 'str', bool: false, float: 222.2, null: 'not null', bigint: 200n, obj: { num: 500 } },
  { num: 999, str: 'str', bool: false, float: 222.2, null: null, bigint: 10n, obj: { num: 500 } },
];

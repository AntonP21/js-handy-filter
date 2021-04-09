export const ALL_VALUES = [10, 10n, true, false, 'foo',
  new Date(2000, 5, 11), new Date(2000, 9, 1), null, undefined];

/**
 * The function to generate list of values for tests.
 *
 * @param exclude - Values to exclude from the result list
 */
export const getValues = (exclude?: any[]) => {
  const allValues = [...ALL_VALUES];

  if (exclude) {
    for (const item of exclude) {
      const index = allValues.indexOf(item);

      if (index > -1) {
        allValues.splice(index, 1);
      }
    }
  }

  return allValues;
};

export const NOT_IN: any[][] = [
  [25, getValues()],
  [25n, getValues()],
  [true, getValues([true])],
  [false, getValues([false])],
  ['fOo', getValues()],
  [new Date(2000, 11, 5), getValues()],
  [null, getValues([null])],
  [undefined, getValues([undefined])],
];

export const IN: any[][] = [
  [10, getValues()],
  [10n, getValues()],
  [true, getValues()],
  [false, getValues()],
  ['foo', getValues()],
  [new Date(2000, 9, 1), getValues()],
  [null, getValues()],
  [undefined, getValues()],
];

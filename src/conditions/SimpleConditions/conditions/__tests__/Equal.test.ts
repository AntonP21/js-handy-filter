import { eq } from 'conditions';

import * as fixtures from './lib/fixtures';

describe('Equal tests', () => {
  it.each(
    fixtures.VALUES_GREATER_THAN_LIMIT,
  )('should return false when a passed value (%p) is greater than a limit (%p)', (value, limit) => {
    expect(eq(limit).check(value)).toBeFalsy();
  });

  it.each(
    fixtures.VALUES_LESS_THAN_LIMIT,
  )('should return false when a passed value (%p) is less than a limit (%p)', (value, limit) => {
    expect(eq(limit).check(value)).toBeFalsy();
  });

  it.each([
    ...fixtures.VALUES_EQUAL_TO_LIMIT,
    [null, null],
    [undefined, undefined],
  ])('should return true when a passed value (%p) is equal to a limit (%p)', (value, limit) => {
    expect(eq(limit).check(value)).toBeTruthy();
  });

  it.each(
    fixtures.SIMPLE_VALUES,
  )('should return true for any value (%p) when a limit is "__any__"', (value) => {
    expect(eq('__any__').check(value)).toBeTruthy();
  });

  it.each([
    ...fixtures.NON_NULLABLE_SIMPLE_VALUES,
    [undefined],
  ])('should return false when a passed value is null but a limit (%p) is not', (limit) => {
    expect(eq(limit).check(null)).toBeFalsy();
  });

  it.each([
    ...fixtures.NON_NULLABLE_SIMPLE_VALUES,
    [undefined],
  ])('should return false when a limit is null but a passed value (%p) is not', (value) => {
    expect(eq(null).check(value)).toBeFalsy();
  });

  it.each([
    ...fixtures.NON_NULLABLE_SIMPLE_VALUES,
    [null],
  ])('should return false when a passed value is undefined but a limit (%p) is not', (limit) => {
    expect(eq(limit).check(undefined)).toBeFalsy();
  });

  it.each([
    ...fixtures.NON_NULLABLE_SIMPLE_VALUES,
    [null],
  ])('should return false when a limit is undefined but a passed value (%p) is not', (value) => {
    expect(eq(undefined).check(value)).toBeFalsy();
  });
});

import { ne } from 'conditions';

import * as fixtures from './lib/fixtures';

describe('NotEqual tests', () => {
  it.each(
    fixtures.VALUES_GREATER_THAN_LIMIT,
  )('should return true when a passed value is greater than a limit', (value, limit) => {
    expect(ne(limit).check(value)).toBeTruthy();
  });

  it.each(
    fixtures.VALUES_LESS_THAN_LIMIT,
  )('should return true when a passed value is less than a limit', (value, limit) => {
    expect(ne(limit).check(value)).toBeTruthy();
  });

  it.each([
    ...fixtures.VALUES_EQUAL_TO_LIMIT,
    [null, null],
    [undefined, undefined],
  ])('should return false when a passed value is equal to a limit', (value, limit) => {
    expect(ne(limit).check(value)).toBeFalsy();
  });

  it.each(
    fixtures.SIMPLE_VALUES,
  )('should return true for any value (%p) when a limit is "__any__"', (value) => {
    expect(ne('__any__').check(value)).toBeTruthy();
  });

  it('should return false when a passed value and a limit is null', () => {
    expect(ne(null).check(null)).toBeFalsy();
  });

  it.each([
    ...fixtures.NON_NULLABLE_SIMPLE_VALUES,
    [undefined],
  ])('should return true when a passed value is null but a limit is not', (limit) => {
    expect(ne(limit).check(null)).toBeTruthy();
  });

  it.each([
    ...fixtures.NON_NULLABLE_SIMPLE_VALUES,
    [undefined],
  ])('should return true when a limit is null but a passed value is not', (value) => {
    expect(ne(null).check(value)).toBeTruthy();
  });

  it('should return false when a passed value and a limit is undefined', () => {
    expect(ne(undefined).check(undefined)).toBeFalsy();
  });

  it.each([
    ...fixtures.NON_NULLABLE_SIMPLE_VALUES,
    [null],
  ])('should return true when a passed value is undefined but a limit is not', (limit) => {
    expect(ne(limit).check(undefined)).toBeTruthy();
  });

  it.each([
    ...fixtures.NON_NULLABLE_SIMPLE_VALUES,
    [null],
  ])('should return true when a limit is undefined but a passed value is not', (value) => {
    expect(ne(undefined).check(value)).toBeTruthy();
  });
});

import { lte } from 'conditions';
import { TypeError } from 'conditions/errors';

import * as fixtures from './lib/fixtures';

describe('LessOrEqual tests', () => {
  it.each(
    fixtures.VALUES_GREATER_THAN_LIMIT,
  )('should return false when a passed value (%p) is greater than a limit (%p)', (value, limit) => {
    expect(lte(limit).check(value)).toBeFalsy();
  });

  it.each(
    fixtures.VALUES_LESS_THAN_LIMIT,
  )('should return true when a passed value (%p) is less than a limit (%p)', (value, limit) => {
    expect(lte(limit).check(value)).toBeTruthy();
  });

  it.each(
    fixtures.VALUES_EQUAL_TO_LIMIT,
  )('should return true when a passed value (%p) is equal to a limit (%p)', (value, limit) => {
    expect(lte(limit).check(value)).toBeTruthy();
  });

  it.each(
    fixtures.SIMPLE_VALUES,
  )('should return true for any value (%p) when a limit is "__any__"', (value) => {
    expect(lte('__any__').check(value)).toBeTruthy();
  });

  it.each(
    fixtures.NON_NULLABLE_SIMPLE_VALUES,
  )('should throw TypeError when expected a SimpleValue but null is passed', (limit) => {
    expect(() => lte(limit).check(null)).toThrow(TypeError);
  });

  it.each(
    fixtures.NON_NULLABLE_SIMPLE_VALUES,
  )('should throw TypeError when null is passed as a limit', (value) => {
    expect(() => lte(null).check(value)).toThrow(TypeError);
  });

  it.each(
    fixtures.NON_NULLABLE_SIMPLE_VALUES,
  )('should throw TypeError when expected a SimpleValue but undefined is passed', (limit) => {
    expect(() => lte(limit).check(undefined)).toThrow(TypeError);
  });

  it.each(
    fixtures.NON_NULLABLE_SIMPLE_VALUES,
  )('should throw TypeError when undefined is passed as a limit', (value) => {
    expect(() => lte(undefined).check(value)).toThrow(TypeError);
  });
});

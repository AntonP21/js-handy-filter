import { inl } from 'conditions';

import * as fixtures from './lib/fixtures';

describe('"In" condition tests', () => {
  it.each(
    fixtures.NOT_IN,
  )('should return false when a passed value (%p) is not in a condition (%p)', (value, condition) => {
    expect(inl(condition).check(value)).toBeFalsy();
  });

  it.each(
    fixtures.IN,
  )('should return true when a passed value (%p) is in a condition (%p)', (value, condition) => {
    expect(inl(condition).check(value)).toBeTruthy();
  });

  it.each([
    ...fixtures.NOT_IN,
    ...fixtures.IN,
  ])('should return true for any value (%p) when a condition is "__any__"', (value) => {
    expect(inl('__any__').check(value)).toBeTruthy();
  });
});

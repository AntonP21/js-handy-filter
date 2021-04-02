import { ictn } from 'conditions';

import * as fixtures from './lib/fixtures';

describe('Ignore case contain tests', () => {
  it.each([
    ...fixtures.VALUES_CONTAINING_CONDITIONS,
    ...fixtures.CASE_SENSITIVE_VALUES,
  ])('should return true when a passed value (%p) contain condition (%p)', (value, limit) => {
    expect(ictn(limit).check(value)).toBeTruthy();
  });

  it.each(
    fixtures.VALUES_NOT_CONTAINING_CONDITIONS,
  )('should return false when a passed value (%p) do not contain condition (%p)', (value, limit) => {
    expect(ictn(limit).check(value)).toBeFalsy();
  });

  it.each(
    fixtures.SIMPLE_VALUES,
  )('should return true for any value (%p) when a limit is "__any__"', (value) => {
    expect(ictn('__any__').check(value)).toBeTruthy();
  });
});

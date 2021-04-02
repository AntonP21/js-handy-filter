import { ctn } from 'conditions';

import * as fixtures from './lib/fixtures';

describe('Contain tests', () => {
  it.each(
    fixtures.VALUES_CONTAINING_CONDITIONS,
  )('should return true when a passed value (%p) contain condition (%p)', (value, limit) => {
    expect(ctn(limit).check(value)).toBeTruthy();
  });

  it.each([
    ...fixtures.CASE_SENSITIVE_VALUES,
    ...fixtures.VALUES_NOT_CONTAINING_CONDITIONS,
  ])('should return false when a passed value (%p) do not contain condition (%p)', (value, limit) => {
    expect(ctn(limit).check(value)).toBeFalsy();
  });

  it.each(
    fixtures.SIMPLE_VALUES,
  )('should return true for any value (%p) when a limit is "__any__"', (value) => {
    expect(ctn('__any__').check(value)).toBeTruthy();
  });
});

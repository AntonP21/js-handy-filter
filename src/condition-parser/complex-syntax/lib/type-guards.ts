import { isArray } from 'lib/type-guards';

import { ComplexCondition } from '../types';

import { LOGICAL_CONDITION_MAP } from './constants';

/**
 * The function for checking is a value ComplexCondition.
 *
 * @param value - The value to check;
 */
export const isComplexCondition = (value: any): value is ComplexCondition => (
  isArray(value) && value.length > 1 && value.some((item) => item in LOGICAL_CONDITION_MAP)
);

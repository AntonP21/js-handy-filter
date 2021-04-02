// DON'T IMPORT LOGICAL CONDITIONS HERE, IT COULD BE CYCLIC DEPENDENCY
import { eq, gt, gte, lt, lte, ne } from 'conditions/SimpleConditions';
import { ctn, ictn } from 'conditions/RegExpConditions';

export const SIMPLE_CONDITIONS_MAP = { eq, gt, gte, lt, lte, ne };
export const REGEXP_CONDITIONS_MAP = { ctn, ictn };

// DON'T IMPORT LOGICAL CONDITIONS HERE, IT COULD BE CYCLIC DEPENDENCY
import { eq, gt, gte, lt, lte } from 'conditions/SimpleConditions';
import { cnt, icnt } from 'conditions/RegExpConditions';

export const SIMPLE_CONDITIONS_MAP = { eq, gt, gte, lt, lte };
export const REGEXP_CONDITIONS_MAP = { cnt, icnt };

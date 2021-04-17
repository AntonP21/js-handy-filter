import { And, Not, Or, Equal, Greater, GreaterOrEqual, Less,
  LessOrEqual, Contain, IContain,
  and, not, or, eq, gt, gte, lt, lte, cnt, icnt } from 'conditions';
import { ICondition } from 'conditions/types';

export const ALL_CONDITIONS: [ICondition][] = [
  [and(gt(10), lte(100))],
  [or(eq(10), gte(100))],
  [eq(10)],
  [gt(10)],
  [gte(10)],
  [lt(10)],
  [lte(10)],
  [not(eq(10))],
  [cnt(/regexp/)],
  [icnt(/regexp/)],
];

export const ALL_CONDITIONS_WITH_TYPES: [any, ICondition][] = [
  [And, and(gt(10), lte(100))],
  [Or, or(eq(10), gte(100))],
  [Equal, eq(10)],
  [Greater, gt(10)],
  [GreaterOrEqual, gte(10)],
  [Less, lt(10)],
  [LessOrEqual, lte(10)],
  [Not, not(eq(10))],
  [Contain, cnt(/regexp/)],
  [IContain, icnt(/regexp/)],
];

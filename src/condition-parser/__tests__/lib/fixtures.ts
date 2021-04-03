import { And, Or, Equal, Greater, GreaterOrEqual, Less,
  LessOrEqual, NotEqual, Contain, IContain,
  and, or, eq, gt, gte, lt, lte, ne, cnt, icnt } from 'conditions';
import { Condition } from 'conditions/types';

export const ALL_CONDITIONS: [Condition][] = [
  // Aliases
  [and(gt(10), lte(100))],
  [or(eq(10), gte(100))],
  [eq(10)],
  [gt(10)],
  [gte(10)],
  [lt(10)],
  [lte(10)],
  [ne(10)],
  [cnt(/regexp/)],
  [icnt(/regexp/)],
  // PlainConditions
  [['eq', 10]],
  [['gt', 10]],
  [['gte', 10]],
  [['lt', 10]],
  [['lte', 10]],
  [['ne', 10]],
  [['cnt', /regexp/]],
  [['icnt', /regexp/]],
];

export const ALL_CONDITIONS_WITH_TYPES: [any, Condition][] = [
  // Aliases
  [And, and(gt(10), lte(100))],
  [Or, or(eq(10), gte(100))],
  [Equal, eq(10)],
  [Greater, gt(10)],
  [GreaterOrEqual, gte(10)],
  [Less, lt(10)],
  [LessOrEqual, lte(10)],
  [NotEqual, ne(10)],
  [Contain, cnt(/regexp/)],
  [IContain, icnt(/regexp/)],
  // PlainConditions
  [Equal, ['eq', 10]],
  [Greater, ['gt', 10]],
  [GreaterOrEqual, ['gte', 10]],
  [Less, ['lt', 10]],
  [LessOrEqual, ['lte', 10]],
  [NotEqual, ['ne', 10]],
  [Contain, ['cnt', /regexp/]],
  [IContain, ['icnt', /regexp/]],
];

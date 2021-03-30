import {
  And,
  Or,
  Equal,
  Greater,
  GreaterOrEqual,
  Less,
  LessOrEqual,
  NotEqual,
  and,
  or,
  eq,
  gt,
  gte,
  lt,
  lte,
  ne,
} from 'conditions';
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
  // PlainSimpleConditions
  [['eq', 10]],
  [['gt', 10]],
  [['gte', 10]],
  [['lt', 10]],
  [['lte', 10]],
  [['ne', 10]],
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
  // PlainSimpleConditions
  [Equal, ['eq', 10]],
  [Greater, ['gt', 10]],
  [GreaterOrEqual, ['gte', 10]],
  [Less, ['lt', 10]],
  [LessOrEqual, ['lte', 10]],
  [NotEqual, ['ne', 10]],
];

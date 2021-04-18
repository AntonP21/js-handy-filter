import { and, not, or, eq, gt, gte, lt, lte, cnt, icnt, inl } from 'conditions';

export const CONDITION_MAP = {
  '=': eq,
  '>': gt,
  '>=': gte,
  '<': lt,
  '<=': lte,
  eq,
  gt,
  gte,
  lt,
  lte,
  cnt,
  icnt,
  in: inl,
};

export const LOGICAL_CONDITION_MAP = { and, not, or };

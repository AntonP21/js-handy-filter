import { ConditionConstructor, RegExpValue } from '../../types';

import RegExpCondition from '../conditions/RegExpCondition';
import Contain from '../conditions/Contain';
import IContain from '../conditions/IContain';

type Values = ConstructorParameters<ConditionConstructor<RegExpCondition, RegExpValue>>;

/**
 * The alias for "contain" condition.
 */
export const ctn = (...values: Values) => (
  // There is the TypeScript bug. See - https://github.com/microsoft/TypeScript/issues/28010
  // @ts-ignore
  new Contain(...values)
);

/**
 * The alias for "ignore case contain" condition.
 */
export const ictn = (...values: Values) => (
  // There is the TypeScript bug. See - https://github.com/microsoft/TypeScript/issues/28010
  // @ts-ignore
  new IContain(...values)
);

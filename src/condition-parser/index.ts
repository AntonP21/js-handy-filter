import { isArray } from 'lib/type-guards';

import { Condition, ICondition } from 'conditions/types';
import { isICondition } from 'conditions/lib/type-guards';

import { ParseError } from './errors';

/**
 * The class for parsing conditions.
 */
export class ConditionParser {
  parse(condition: Condition): ICondition;
  parse(conditions: Condition[]): ICondition[];
  /**
   * The method for parsing conditions.
   */
  parse(conditions: Condition | Condition[]): ICondition | ICondition[] {
    if (isICondition(conditions)) {
      return conditions;
    }

    if (isArray(conditions)) {
      // In order to recursion works here need use an arrow function.
      // conditions.map(this.parse) does not work here.
      return conditions.map((condition) => this.parse(condition));
    }

    throw new ParseError(`Unable to parse ${conditions}`);
  }
}

export default new ConditionParser();

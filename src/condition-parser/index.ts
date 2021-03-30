import { isArray } from 'lib/type-guards';

import {
  Condition,
  ICondition,
  PlainCondition,
  SimpleConditionKey,
  SimpleValue,
  StringCondition,
} from 'conditions/types';
import { isICondition, isPlainCondition, isSimpleConditionKey } from 'conditions/lib/type-guards';

import { ParseError } from './errors';
import { SIMPLE_CONDITIONS_MAP } from './lib/constants';

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
    if (isPlainCondition<SimpleValue>(conditions)) {
      return this.parseSimplePlainCondition(conditions);
    }

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

  /**
   * The method for parsing a plain condition.
   */
  protected parseSimplePlainCondition = ([stringCondition, value]: PlainCondition<SimpleValue>): ICondition => {
    const [path, key] = this.parseStringCondition(stringCondition);
    return SIMPLE_CONDITIONS_MAP[key](path, value);
  };

  /**
   * The method for parsing a string condition.
   *
   * @param condition - Conditions to parse;
   */
  protected parseStringCondition = (condition: StringCondition): [string, SimpleConditionKey] => {
    const parsed = condition.split('__', 2);
    let path = '';
    let key;

    if (parsed.length === 2) {
      ([path, key] = parsed);
    } else {
      key = parsed[0];
    }

    if (!isSimpleConditionKey(key)) {
      throw new ParseError(`${key} is not supported`);
    }

    return [path, key];
  };
}

export default new ConditionParser();

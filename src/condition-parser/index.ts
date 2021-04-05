import { isArray } from 'lib/type-guards';

import { Condition, ICondition, PlainCondition, SimpleValue, StringCondition } from 'conditions/types';
import { isICondition, isPlainCondition } from 'conditions/lib/type-guards';

import { ParseError } from './errors';
import { REGEXP_CONDITIONS_MAP, SIMPLE_CONDITIONS_MAP } from './lib/constants';

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

    if (isPlainCondition(conditions)) {
      return this.parsePlainCondition(conditions as PlainCondition<SimpleValue>);
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
  protected parsePlainCondition = ([stringCondition, value]: PlainCondition<any>): ICondition => {
    const [path, key] = this.parseStringCondition(stringCondition);

    if (key in SIMPLE_CONDITIONS_MAP) {
      return SIMPLE_CONDITIONS_MAP[key as keyof typeof SIMPLE_CONDITIONS_MAP](path, value);
    }

    if (key in REGEXP_CONDITIONS_MAP) {
      return REGEXP_CONDITIONS_MAP[key as keyof typeof REGEXP_CONDITIONS_MAP](path, value);
    }

    throw new ParseError(`${key} is not supported`);
  };

  /**
   * The method for parsing a string condition.
   *
   * @param condition - Conditions to parse;
   */
  protected parseStringCondition = (condition: StringCondition): [string, string] => {
    const parsed = condition.split('__', 2);
    let path = '';
    let key;

    if (parsed.length === 2) {
      ([path, key] = parsed);
    } else {
      key = parsed[0];
    }

    return [path, key];
  };
}

export default new ConditionParser();

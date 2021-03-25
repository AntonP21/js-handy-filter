import { isArray } from 'lib/type-guards';

import { ParseError } from '../errors';
import { Condition, ICondition, PlainCondition, SimpleConditionKey, StringCondition } from '../types';
import { isICondition, isPlainCondition, isSimpleConditionKey } from '../lib/type-guards';

import { getSimpleConditionClassByKey } from './lib/utils';

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
    if (isPlainCondition(conditions)) {
      return this.parseCondition(conditions);
    }

    if (isArray(conditions)) {
      return conditions.map(this.parseCondition);
    }

    throw new ParseError(`Unable to parse condition(s) ${conditions}`);
  }

  protected parseCondition = (condition: Condition): ICondition => {
    if (isPlainCondition(condition)) {
      return this.parsePlainCondition(condition);
    }

    if (isICondition(condition)) {
      return condition;
    }

    throw new ParseError(`Unable to parse condition ${condition}`);
  };

  /**
   * The method for parsing a plain condition.
   */
  protected parsePlainCondition = ([stringCondition, value]: PlainCondition): ICondition => {
    const [path, key] = this.parseStringCondition(stringCondition);
    const SimpleConditionClass = getSimpleConditionClassByKey(key);

    return new SimpleConditionClass(path, value);
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

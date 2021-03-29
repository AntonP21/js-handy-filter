import { Greater, GreaterOrEqual } from 'conditions/SimpleConditions';
import { TypeError } from 'conditions/errors';

import { getSimpleConditionClassByKey } from '../utils';

describe('Utils tests', () => {
  describe('getSimpleConditionClassByKey tests', () => {
    it('should return the Greater class when the "gt" key is passed', () => {
      expect(getSimpleConditionClassByKey('gt')).toBe(Greater);
    });

    it('should return the GreaterOrEqual class when the "gte" key is passed', () => {
      expect(getSimpleConditionClassByKey('gte')).toBe(GreaterOrEqual);
    });

    it('should throw an Error when an incorrect key is passed', () => {
      expect(() => getSimpleConditionClassByKey('some string' as any)).toThrow(TypeError);
    });
  });
});

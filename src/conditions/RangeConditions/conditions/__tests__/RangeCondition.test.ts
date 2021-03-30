import sinon from 'ts-sinon';

import { TypeError } from 'conditions/errors';

import RangeCondition from '../RangeCondition';

/**
 * The Test implementation of RangeCondition.
 */
class TestClass extends RangeCondition {
  validate = (): boolean => true;
}

describe('RangeCondition tests', () => {
  const someRange = [1000, 2000];
  const someValue = 1500;
  let testObject: any;

  beforeEach(() => {
    testObject = {
      numField: 123,
      strField: 'some string',
      obj: {
        numField: 456,
        strField: 'another string',
      },
    };
  });

  afterEach(() => {
    sinon.restore();
  });

  describe('Tests the "check" method', () => {
    it('should invoke validate with correct args when checking an object', () => {
      const testInstance = new TestClass('obj.numField', someRange);
      const validateSpy = sinon.spy(testInstance, 'validate');

      testInstance.check(testObject);

      expect(validateSpy.getCall(0).args).toStrictEqual([testObject.obj.numField]);
    });

    it('should throw TypeError when expected a SimpleValue but an object is passed', () => {
      const testInstance = new TestClass(someRange);

      expect(() => testInstance.check(testObject)).toThrow(TypeError);
    });

    it('should invoke validate with correct args when checking a SimpleValue', () => {
      const testInstance = new TestClass(someRange);
      const validateSpy = sinon.spy(testInstance, 'validate');

      testInstance.check(someValue);

      expect(validateSpy.getCall(0).args).toStrictEqual([someValue]);
    });

    it('should throw TypeError when expected an object but a SimpleValue is passed', () => {
      const testInstance = new TestClass('obj.numField', someRange);

      expect(() => testInstance.check(someValue)).toThrow(TypeError);
    });

    it('should invoke validate with correct args when "field" is empty string', () => {
      const testInstance = new TestClass('', someRange);
      const validateSpy = sinon.spy(testInstance, 'validate');

      testInstance.check(someValue);

      expect(validateSpy.getCall(0).args).toStrictEqual([someValue]);
    });
  });

  describe('Tests with "__any__"', () => {
    it('should have the isAlwaysTrue property equal to true when a limit is "__any__"', () => {
      const testInstance = new TestClass('__any__');

      expect(testInstance.isAlwaysTrue).toBeTruthy();
    });
  });
});

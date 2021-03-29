import sinon from 'ts-sinon';

import { TypeError } from 'conditions/errors';

import SimpleCondition from '../SimpleCondition';

/**
 * The Test implementation of SimpleCondition.
 */
class TestClass extends SimpleCondition {
  validate = (): boolean => true;
}

describe('SimpleCondition tests', () => {
  const someNumValue = 1000;
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
      const testInstance = new TestClass('obj.numField', someNumValue);
      const validateSpy = sinon.spy(testInstance, 'validate');

      testInstance.check(testObject);

      expect(validateSpy.getCall(0).args).toStrictEqual([testObject.obj.numField]);
    });

    it('should throw TypeError when expected a SimpleValue but an object is passed', () => {
      const testInstance = new TestClass(someNumValue);

      expect(() => testInstance.check(testObject)).toThrow(TypeError);
    });

    it('should invoke validate with correct args when checking a SimpleValue', () => {
      const testInstance = new TestClass(someNumValue);
      const validateSpy = sinon.spy(testInstance, 'validate');

      testInstance.check(someNumValue);

      expect(validateSpy.getCall(0).args).toStrictEqual([someNumValue]);
    });

    it('should throw TypeError when expected an object but a SimpleValue is passed', () => {
      const testInstance = new TestClass('obj.numField', someNumValue);

      expect(() => testInstance.check(someNumValue)).toThrow(TypeError);
    });

    it('should invoke validate with correct args when "field" is empty string', () => {
      const testInstance = new TestClass('', someNumValue);
      const validateSpy = sinon.spy(testInstance, 'validate');

      testInstance.check(someNumValue);

      expect(validateSpy.getCall(0).args).toStrictEqual([someNumValue]);
    });
  });

  describe('Tests with "__any__"', () => {
    it('should always return true when a limit is "__any__"', () => {
      const testInstance = new TestClass('__any__');

      expect(testInstance.check(someNumValue)).toBeTruthy();
    });

    it('should have the isAlwaysTrue property equal to true when a limit is "__any__"', () => {
      const testInstance = new TestClass('__any__');

      expect(testInstance.isAlwaysTrue).toBeTruthy();
    });
  });
});

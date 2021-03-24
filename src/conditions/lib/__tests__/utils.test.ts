import { getValue } from '../utils';

describe('Utils tests', () => {
  describe('getValue tests', () => {
    it('should return a value by the passed path', () => {
      const testObject = {
        field: 123,
        obj: { obj: { field: 'string' } },
      };

      expect(getValue(testObject, 'field')).toBe(testObject.field);
      expect(getValue(testObject, 'obj.obj.field')).toBe(testObject.obj.obj.field);
    });
  });
});

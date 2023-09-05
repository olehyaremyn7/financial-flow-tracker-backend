import { convertToMs } from '../../utils/common.js';

describe('Utils', (): void => {
  describe('convertToMs()', (): void => {
    it('should convert time to ms', (): void => {
      expect(convertToMs('1d')).toBe(86400000);
    });
  });
});

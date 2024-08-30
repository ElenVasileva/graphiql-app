import { describe, expect, it } from 'vitest';
import timeToString from './timeToString';

describe('timeToString', () => {
  it('should convert a timestamp to a formatted string with timezone', () => {
    const timestamp = 1625140800000;
    const result = timeToString(timestamp);

    expect(result).toMatch(/01\.07\.2021/);
    expect(result).toMatch(/[\d]{2}:[\d]{2}:[\d]{2}/);
    expect(result).toMatch(/GMT\+[\d]+/);
  });

  it('should handle invalid timestamps', () => {
    const invalidTimestamp = NaN;
    const result = timeToString(invalidTimestamp);

    expect(result).toBe('Invalid Date');
  });
});

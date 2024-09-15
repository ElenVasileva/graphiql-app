import { describe, it, expect } from 'vitest';
import base64ToString from './base64ToString';

describe('base64ToString', () => {
  it('should decode a base64-encoded string correctly', () => {
    const input = 'SGVsbG8sIFdvcmxkIQ=='; // "Hello, World!" in base64
    const expected = 'Hello, World!';
    const result = base64ToString(input);
    expect(result).toBe(expected);
  });

  it('should handle an empty string', () => {
    const input = '';
    const expected = '';
    const result = base64ToString(input);
    expect(result).toBe(expected);
  });

  it('should handle invalid base64 input gracefully', () => {
    const input = 'InvalidBase64!';
    expect(() => base64ToString(input)).toThrowError();
  });
});

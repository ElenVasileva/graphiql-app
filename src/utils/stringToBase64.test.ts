import { describe, it, expect } from 'vitest';
import stringToBase64 from './stringToBase64';

describe('stringToBase64', () => {
  it('should correctly encode a string to Base64', () => {
    const input = 'Hello, World!';
    const expectedOutput = 'SGVsbG8sIFdvcmxkIQ=='; // Base64 representation of "Hello, World!"

    const result = stringToBase64(input);

    expect(result).toBe(expectedOutput);
  });

  it('should handle an empty string', () => {
    const input = '';
    const expectedOutput = '';

    const result = stringToBase64(input);

    expect(result).toBe(expectedOutput);
  });

  it('should correctly encode a string with special characters', () => {
    const input = 'Привет, мир!';
    const expectedOutput = '0J/RgNC40LLQtdGCLCDQvNC40YAh';

    const result = stringToBase64(input);

    expect(result).toBe(expectedOutput);
  });
});

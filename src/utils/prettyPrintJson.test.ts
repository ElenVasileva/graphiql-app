import { describe, it, expect } from 'vitest';
import prettyPrintJson, { tryParseJson } from './prettyPrintJson';
describe('prettyPrintJson', () => {
  it('should return a pretty-printed JSON string when given a valid JSON string', () => {
    const input = '{"name":"John","age":30,"city":"New York"}';
    const expectedOutput = `{
    "name": "John",
    "age": 30,
    "city": "New York"
}`;
    expect(prettyPrintJson(input)).toBe(expectedOutput);
  });

  it('should return an empty string when given null', () => {
    expect(prettyPrintJson(null)).toBe('');
  });

  it('should return the original string when given an invalid JSON string', () => {
    const invalidJson = '{"name":"John", "age":30,}';
    expect(prettyPrintJson(invalidJson)).toBe(invalidJson);
  });

  it('should return the original string when given an empty JSON string', () => {
    const emptyJson = '';
    expect(prettyPrintJson(emptyJson)).toBe('');
  });

  it('should handle complex JSON structures correctly', () => {
    const input = '{"data":{"items":[1,2,3],"info":{"count":3}}}';
    const expectedOutput = `{
    "data": {
        "items": [
            1,
            2,
            3
        ],
        "info": {
            "count": 3
        }
    }
}`;
    expect(prettyPrintJson(input)).toBe(expectedOutput);
  });
});

describe('tryParseJson', () => {
  it('should return a pretty-printed JSON string when given a valid JSON string', () => {
    const input = '{"name":"John","age":30,"city":"New York"}';
    const expectedOutput = `{
    "name": "John",
    "age": 30,
    "city": "New York"
}`;
    expect(tryParseJson(input)).toBe(expectedOutput);
  });

  it('should return undefined when given an invalid JSON string', () => {
    const invalidJson = '{"name":"John", "age":30,}';
    expect(tryParseJson(invalidJson)).toBe(undefined);
  });

  it('should return undefined when given an empty JSON string', () => {
    const emptyJson = '';
    expect(tryParseJson(emptyJson)).toBe(undefined);
  });

  it('should handle complex JSON structures correctly', () => {
    const input = '{"data":{"items":[1,2,3],"info":{"count":3}}}';
    const expectedOutput = `{
    "data": {
        "items": [
            1,
            2,
            3
        ],
        "info": {
            "count": 3
        }
    }
}`;
    expect(tryParseJson(input)).toBe(expectedOutput);
  });
});

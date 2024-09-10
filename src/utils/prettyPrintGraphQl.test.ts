import { describe, it, expect, vi } from 'vitest';
import prettier from 'prettier/standalone';
import prettierPluginGraphql from 'prettier/plugins/graphql';
import prettyPrintGraphQl from './prettyPrintGraphQl';

describe('prettyPrintGraphQl', () => {
  it('should correctly format a GraphQL string', async () => {
    const input = `query{user{id name}}`;

    const result = await prettyPrintGraphQl(input);
    expect(result).toMatchInlineSnapshot(`
      "query {
        user {
          id
          name
        }
      }
      "`);
  });

  it('should return the original string if formatting fails', async () => {
    const input = `query {\n  user {\n    id\n    name\n  }\n}}}}`;

    const result = await prettyPrintGraphQl(input);
    expect(result).toBe(input);
  });

  it('should return an empty string if the input string is undefined', async () => {
    const result = await prettyPrintGraphQl(undefined);
    expect(result).toBe('');
  });
});

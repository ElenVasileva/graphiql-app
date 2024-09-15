import * as prettier from 'prettier/standalone';
import prettierPluginGraphql from 'prettier/plugins/graphql';

export default async function prettyPrintGraphQl(str: string | undefined) {
  if (!str) return { str: '', error: null };
  try {
    const formattedStr = await prettier.format(str, {
      parser: 'graphql',
      plugins: [prettierPluginGraphql],
    });
    return { str: formattedStr, error: null };
  } catch (e) {
    return { str, error: e instanceof Error ? e.message : 'Error' };
  }
}

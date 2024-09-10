import * as prettier from 'prettier/standalone';
import prettierPluginGraphql from 'prettier/plugins/graphql';

export default async function prettyPrintGraphQl(str: string | undefined) {
  if (!str) return '';
  try {
    const formattedStr = await prettier.format(str, {
      parser: 'graphql',
      plugins: [prettierPluginGraphql],
    });
    return formattedStr;
  } catch (e) {
    return str;
  }
}

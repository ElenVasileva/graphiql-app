const numberOfSpaces = 4;

export default function prettyPrintJson(str: string | null) {
  if (!str) return '';
  try {
    const obj = JSON.parse(str);
    return JSON.stringify(obj, undefined, numberOfSpaces);
  } catch (error) {
    return str;
  }
}

export const tryParseJson = (text: string | undefined): string | undefined => {
  try {
    if (text) {
      return JSON.stringify(JSON.parse(text), undefined, numberOfSpaces);
    }
  } catch {
    return undefined;
  }
};

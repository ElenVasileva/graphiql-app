export default function prettyPrintJson(str: string | null) {
  if (!str) return '';
  try {
    const obj = JSON.parse(str);
    const numberOfSpaces = 4;
    return JSON.stringify(obj, undefined, numberOfSpaces);
  } catch (error) {
    return str;
  }
}

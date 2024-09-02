function isEmpty(line: string) {
  return line === '';
}

function createNewLine(space: number) {
  return ' '.repeat(space < 0 ? 0 : space);
}

function isSpaceBetweenWord(el: string, i: number) {
  return (
    el[i - 1] !== ' ' &&
    el[i - 1] !== '{' &&
    el[i - 1] !== '}' &&
    el[i - 1] !== '(' &&
    el[i - 1] !== ')' &&
    el[i - 1] !== ':' &&
    el[i + 1] !== ' ' &&
    el[i + 1] !== '{' &&
    el[i + 1] !== '}' &&
    el[i + 1] !== '(' &&
    el[i + 1] !== ')' &&
    el[i + 1] !== ':'
  );
}

export default function prettyPrintGraphQl(str: string | undefined) {
  if (!str) return '';

  const arrStr = str
    .split('\n')
    .map((el) => el.replace(/\s+/g, ' ').trim())
    .filter((el) => el !== '');

  const result: string[] = [];
  let space = 0;
  const SPACE_STEP = 2;

  arrStr.forEach((el) => {
    let line = '';
    for (let i = 0; i < el.length; i++) {
      switch (el[i]) {
        case '{':
          if (isEmpty(line)) line = createNewLine(space);
          line += '{';
          result.push(line);
          space += SPACE_STEP;
          line = '';
          break;
        case '}':
          space -= SPACE_STEP;
          line = ' '.repeat(space < 0 ? 0 : space) + '}';
          result.push(line);
          line = '';
          break;
        case ' ':
          if (isSpaceBetweenWord(el, i)) {
            result.push(line);
            line = '';
          }
          break;
        default:
          if (isEmpty(line)) line = createNewLine(space);
          line += el[i];
      }
    }
    if (!isEmpty(line)) {
      result.push(line);
    }
  });

  return result.join('\n');
}

// export default function prettyPrintGraphQl(str: string | undefined) {

//   if (!str) return '';

//   let result = [];
//   let line = '';
//   let space = 0;
//   let count_line = 1;
//   const SPACE_STEP = 2;
//   for (let i = 0; i < str.length; i++) {
//     console.log(str[i]);
//     switch (str[i]) {
//       case '{':
//         space += SPACE_STEP;
//         line += '{';
//         result.push(line);
//         line = ' '.repeat(space);
//         break;
//       case '}':
//         space -= SPACE_STEP;
//         console.log(line);
//         result.push(line);

//         line = ' '.repeat(space) + '}';
//         console.log(line);

//         result.push(line);
//         line = '';
//         console.log(line);
//         break;
//       case String.fromCharCode(10):
//         break;
//       case String.fromCharCode(13):
//         break;
//       case ' ':
//         if (
//           str[i - 1] !== ' ' &&
//           str[i - 1] !== '{' &&
//           str[i - 1] !== '}' &&
//           str[i + 1] !== ' ' &&
//           str[i + 1] !== '{' &&
//           str[i + 1] !== '}'
//         ) {
//           result.push(line);
//           line = ' '.repeat(space);
//         }
//         break;
//       default:
//         line += str[i];
//     }
//   }
//   console.log(result);
//   return result.join('\n');
// }
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
    el[i + 1] !== ' ' &&
    el[i + 1] !== '{' &&
    el[i + 1] !== '}'
  );
}

export default function prettyPrintGraphQl(str: string | undefined) {
  if (!str) return '';

  const arrStr = str
    .split('\n')
    .map((el) => el.replace(/\s+/g, ' ').trim())
    .filter((el) => el !== '');

  let result: string[] = [];
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

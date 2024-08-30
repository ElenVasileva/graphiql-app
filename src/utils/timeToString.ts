export default function timeToString(time: number): string {
  const date = new Date(time);

  return date.toLocaleString('ru-RU', {
    timeZoneName: 'short',
  });
}

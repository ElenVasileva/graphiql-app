export default function base64ToString(str: string) {
  const uint8Array = new Uint8Array(
    atob(str)
      .split('')
      .map((c) => c.charCodeAt(0)),
  );
  return new TextDecoder().decode(uint8Array);
}

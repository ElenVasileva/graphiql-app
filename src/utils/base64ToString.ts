export default function base64ToString(str: string) {
  try {
    const uint8Array = new Uint8Array(
      atob(str)
        .split('')
        .map((c) => c.charCodeAt(0)),
    );
    return new TextDecoder().decode(uint8Array);
  } catch (e) {
    throw 'Error: Invalid base64 string:' + str;
  }
}

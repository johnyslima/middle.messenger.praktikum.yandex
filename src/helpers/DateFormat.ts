export function DateFormat(value: string) {
  if(!value) {
      return;
  }

  const date = new Date(value);

  return `${date.getHours()}:${date.getMinutes()}`;
}

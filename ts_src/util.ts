export function isValidIndex(index: number): boolean {
  return typeof index === 'number' && index >= 0;
}

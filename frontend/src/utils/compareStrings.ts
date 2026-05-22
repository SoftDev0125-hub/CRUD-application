/** Locale-aware string compare for stable nested sorting (e.g. designer, then title). */
export function compareStrings(a: string, b: string): number {
  return a.localeCompare(b, undefined, { sensitivity: 'base', numeric: true })
}

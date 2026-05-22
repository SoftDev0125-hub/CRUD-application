/** Align with backend config/security.php limits */
export const INPUT_LIMITS = {
  title: 255,
  designer: 255,
  publisher: 255,
  search: 100,
  tag: 50,
  maxTags: 10,
  tagPattern: /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
} as const

export function clampText(value: string, max: number): string {
  return value.trim().slice(0, max)
}

export function normalizeTagsInput(raw: string): string[] {
  return raw
    .split(',')
    .map((t) => t.trim().toLowerCase().slice(0, INPUT_LIMITS.tag))
    .filter((t) => INPUT_LIMITS.tagPattern.test(t))
    .slice(0, INPUT_LIMITS.maxTags)
}

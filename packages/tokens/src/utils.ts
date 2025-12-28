/**
 * Convert a token path to CSS variable name
 * @example tokenToCssVar('color', 'primary', '500') => 'var(--ds-color-primary-500)'
 */
export function tokenToCssVar(...path: string[]): string {
  const varName = path.join("-");
  return `var(--ds-${varName})`;
}

/**
 * Convert a CSS variable name to token path
 * @example cssVarToToken('--ds-color-primary-500') => ['color', 'primary', '500']
 */
export function cssVarToToken(cssVar: string): string[] {
  const cleaned = cssVar.replace(/^var\(/, "").replace(/\)$/, "");
  const withoutPrefix = cleaned.replace(/^--ds-/, "");
  return withoutPrefix.split("-");
}

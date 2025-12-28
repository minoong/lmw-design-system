import type { ParsedTokenCollection } from '../parsers/variables.parser.js';
import type { ParsedTypography } from '../parsers/typography.parser.js';

/**
 * Convert kebab-case to camelCase
 */
function toCamelCase(str: string): string {
  return str.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
}

/**
 * Generate TypeScript constants from token collections
 */
export function generateTokensTS(collections: ParsedTokenCollection[]): string {
  const lines: string[] = [];

  for (const collection of collections) {
    const constName = toCamelCase(collection.name);

    lines.push(`export const ${constName} = {`);

    for (const token of collection.tokens) {
      const key = toCamelCase(token.name.replace(collection.name + '-', ''));
      const value = typeof token.value === 'string' ? `"${token.value}"` : token.value;
      lines.push(`  "${key}": ${value},`);
    }

    lines.push('} as const;');
    lines.push('');
    lines.push(`export type ${constName.charAt(0).toUpperCase() + constName.slice(1)} = typeof ${constName};`);
    lines.push('');
  }

  return lines.join('\n');
}

/**
 * Generate TypeScript typography constants
 */
export function generateTypographyTS(typography: ParsedTypography[]): string {
  const lines: string[] = [];

  // Font families
  const families = new Set<string>();
  for (const t of typography) {
    families.add(t.fontFamily);
  }

  lines.push('export const fontFamily = {');
  let familyIndex = 0;
  for (const family of families) {
    const key = familyIndex === 0 ? 'primary' : `alt${familyIndex}`;
    lines.push(`  ${key}: "${family}",`);
    familyIndex++;
  }
  lines.push('} as const;');
  lines.push('');

  // Typography presets
  lines.push('export const typographyPresets = {');

  for (const t of typography) {
    const key = toCamelCase(t.name);
    lines.push(`  ${key}: {`);
    lines.push(`    fontFamily: "${t.fontFamily}",`);
    lines.push(`    fontSize: ${t.fontSize},`);
    lines.push(`    fontWeight: ${t.fontWeight},`);
    lines.push(`    lineHeight: ${t.lineHeight.toFixed(2)},`);
    lines.push(`    letterSpacing: ${t.letterSpacing},`);
    lines.push('  },');
  }

  lines.push('} as const;');
  lines.push('');
  lines.push('export type TypographyPresets = typeof typographyPresets;');
  lines.push('');

  return lines.join('\n');
}

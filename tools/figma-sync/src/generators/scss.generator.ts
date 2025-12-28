import type { ParsedTokenCollection } from "../parsers/variables.parser.js";
import type { ParsedTypography } from "../parsers/typography.parser.js";
import { generateHeader } from "../utils/file.js";

/**
 * Generate SCSS partial from token collection
 * Creates a _collection.scss file with CSS custom properties
 */
export function generateTokensSCSS(
  collection: ParsedTokenCollection
): string {
  const lines: string[] = [];
  lines.push(generateHeader());
  lines.push("");
  lines.push(":root {");
  lines.push(`  // ${collection.name}`);

  for (const token of collection.tokens) {
    const value =
      typeof token.value === "number" ? `${token.value}px` : token.value;
    lines.push(`  ${token.cssVar}: ${value};`);
  }

  lines.push("}");

  return lines.join("\n");
}

/**
 * Generate SCSS index file that imports all partials
 */
export function generateTokensIndexSCSS(
  collections: ParsedTokenCollection[]
): string {
  const lines: string[] = [];
  lines.push(generateHeader());
  lines.push("");

  for (const collection of collections) {
    const fileName = collection.name.toLowerCase().replace(/\s+/g, "-");
    lines.push(`@use "${fileName}";`);
  }

  return lines.join("\n");
}

/**
 * Generate SCSS typography with mixins and presets
 */
export function generateTypographySCSS(
  typography: ParsedTypography[]
): string {
  const lines: string[] = [];
  lines.push(generateHeader());
  lines.push("");

  // CSS custom properties for typography tokens
  lines.push(":root {");
  lines.push("  // Font Families");
  lines.push(
    '  --ds-font-family-sans: "Pretendard", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;'
  );
  lines.push(
    '  --ds-font-family-mono: "JetBrains Mono", "Fira Code", Consolas, monospace;'
  );
  lines.push("");

  // Collect unique values
  const fontSizes = new Set<number>();
  const fontWeights = new Set<number>();

  for (const t of typography) {
    fontSizes.add(t.fontSize);
    fontWeights.add(t.fontWeight);
  }

  // Font sizes
  lines.push("  // Font Sizes");
  const sortedSizes = Array.from(fontSizes).sort((a, b) => a - b);
  const sizeNames = ["xs", "sm", "md", "lg", "xl", "2xl", "3xl", "4xl", "5xl"];
  sortedSizes.forEach((size, index) => {
    const name = sizeNames[index] || `${size}`;
    lines.push(`  --ds-font-size-${name}: ${size}px;`);
  });

  lines.push("");

  // Font weights
  lines.push("  // Font Weights");
  const weightNames: Record<number, string> = {
    400: "regular",
    500: "medium",
    600: "semibold",
    700: "bold",
  };
  const sortedWeights = Array.from(fontWeights).sort((a, b) => a - b);
  for (const weight of sortedWeights) {
    const name = weightNames[weight] || `${weight}`;
    lines.push(`  --ds-font-weight-${name}: ${weight};`);
  }

  lines.push("");

  // Line heights
  lines.push("  // Line Heights");
  lines.push("  --ds-line-height-tight: 1.25;");
  lines.push("  --ds-line-height-normal: 1.5;");
  lines.push("  --ds-line-height-relaxed: 1.75;");

  lines.push("");

  // Letter spacing
  lines.push("  // Letter Spacing");
  lines.push("  --ds-letter-spacing-tight: -0.025em;");
  lines.push("  --ds-letter-spacing-normal: 0;");
  lines.push("  --ds-letter-spacing-wide: 0.025em;");

  lines.push("}");
  lines.push("");

  // Typography Mixins
  lines.push("// Typography Mixins");
  lines.push("@mixin heading-base {");
  lines.push("  font-family: var(--ds-font-family-sans);");
  lines.push("  line-height: var(--ds-line-height-tight);");
  lines.push("}");
  lines.push("");
  lines.push("@mixin body-base {");
  lines.push("  font-family: var(--ds-font-family-sans);");
  lines.push("  line-height: var(--ds-line-height-normal);");
  lines.push("}");
  lines.push("");

  // Typography preset classes from Figma
  for (const t of typography) {
    const className = t.name.toLowerCase().replace(/\s+/g, "-");
    const isHeading = t.name.toLowerCase().includes("heading");

    lines.push(`.ds-${className} {`);
    lines.push(`  @include ${isHeading ? "heading" : "body"}-base;`);
    lines.push(`  font-size: ${t.fontSize}px;`);
    lines.push(`  font-weight: ${t.fontWeight};`);
    if (t.letterSpacing !== 0) {
      lines.push(`  letter-spacing: ${t.letterSpacing}px;`);
    }
    lines.push("}");
    lines.push("");
  }

  return lines.join("\n");
}

/**
 * Generate theme SCSS file
 */
export function generateThemeSCSS(
  themeName: string,
  tokens: ParsedTokenCollection[]
): string {
  const lines: string[] = [];
  lines.push(generateHeader());
  lines.push("");

  // Find semantic tokens for theme
  const semanticTokens = tokens.find((c) =>
    c.name.toLowerCase().includes("semantic")
  );

  if (semanticTokens) {
    lines.push(":root {");

    for (const token of semanticTokens.tokens) {
      lines.push(`  ${token.cssVar}: ${token.value};`);
    }

    lines.push("}");
  } else {
    // Generate default theme structure
    lines.push(":root {");
    lines.push("  // Background");
    lines.push("  --ds-bg-primary: var(--ds-color-white);");
    lines.push("  --ds-bg-secondary: var(--ds-color-gray-50);");
    lines.push("  --ds-bg-tertiary: var(--ds-color-gray-100);");
    lines.push("");
    lines.push("  // Foreground");
    lines.push("  --ds-fg-primary: var(--ds-color-gray-900);");
    lines.push("  --ds-fg-secondary: var(--ds-color-gray-600);");
    lines.push("  --ds-fg-tertiary: var(--ds-color-gray-400);");
    lines.push("");
    lines.push("  // Interactive");
    lines.push("  --ds-interactive-primary: var(--ds-color-primary-500);");
    lines.push("  --ds-interactive-primary-hover: var(--ds-color-primary-600);");
    lines.push("  --ds-interactive-primary-active: var(--ds-color-primary-700);");
    lines.push("");
    lines.push("  // Border");
    lines.push("  --ds-border-default: var(--ds-color-gray-200);");
    lines.push("  --ds-border-focus: var(--ds-color-primary-500);");
    lines.push("}");
  }

  return lines.join("\n");
}

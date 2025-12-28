import type { FigmaFile, FigmaStyle, FigmaNode } from "../api/types.js";

export interface ParsedTypography {
  name: string;
  fontFamily: string;
  fontSize: number;
  fontWeight: number;
  lineHeight: number;
  letterSpacing: number;
}

/**
 * Convert style name to kebab-case
 */
function toKebabCase(str: string): string {
  return str
    .replace(/\//g, "-")
    .replace(/([a-z])([A-Z])/g, "$1-$2")
    .replace(/[\s_]+/g, "-")
    .toLowerCase();
}

/**
 * Find text node with matching style key
 */
function findTextNodeByStyleKey(
  nodes: FigmaNode[],
  styleKey: string
): FigmaNode | null {
  for (const node of nodes) {
    if (node.type === "TEXT") {
      return node;
    }
    if (node.children) {
      const found = findTextNodeByStyleKey(node.children, styleKey);
      if (found) return found;
    }
  }
  return null;
}

/**
 * Parse text styles from Figma file
 */
export function parseTypography(file: FigmaFile): ParsedTypography[] {
  const textStyles: ParsedTypography[] = [];

  for (const [key, style] of Object.entries(file.styles)) {
    if (style.styleType !== "TEXT") continue;

    // Find a text node that uses this style
    const textNode = findTextNodeByStyleKey(
      file.document.children,
      key
    );

    if (textNode?.style) {
      textStyles.push({
        name: toKebabCase(style.name),
        fontFamily: textNode.style.fontFamily,
        fontSize: textNode.style.fontSize,
        fontWeight: textNode.style.fontWeight,
        lineHeight: textNode.style.lineHeightPx / textNode.style.fontSize,
        letterSpacing: textNode.style.letterSpacing,
      });
    }
  }

  return textStyles;
}

/**
 * Extract unique font families from typography
 */
export function extractFontFamilies(typography: ParsedTypography[]): string[] {
  const families = new Set<string>();
  for (const t of typography) {
    families.add(t.fontFamily);
  }
  return Array.from(families);
}

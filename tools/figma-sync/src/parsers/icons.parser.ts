import type { FigmaFile } from '../api/types.js';

export interface ParsedIcon {
  id: string;
  name: string;
  componentName: string;
  key: string;
}

/**
 * Convert icon name to PascalCase component name
 */
function toPascalCase(str: string): string {
  return str.replace(/[/\-_\s]+(.)?/g, (_, c) => (c ? c.toUpperCase() : '')).replace(/^./, (c) => c.toUpperCase());
}

/**
 * Parse icon components from Figma file
 * Expects icons to be prefixed with "icon/" or "Icon/"
 */
export function parseIcons(file: FigmaFile, iconPrefix: string = 'icon/'): ParsedIcon[] {
  const icons: ParsedIcon[] = [];
  const prefixLower = iconPrefix.toLowerCase();

  for (const [id, component] of Object.entries(file.components)) {
    const nameLower = component.name.toLowerCase();

    if (nameLower.startsWith(prefixLower)) {
      const iconName = component.name.slice(iconPrefix.length);
      const componentName = `Icon${toPascalCase(iconName)}`;

      icons.push({
        id,
        name: iconName,
        componentName,
        key: component.key,
      });
    }
  }

  return icons;
}

/**
 * Get node IDs for fetching SVG images
 */
export function getIconNodeIds(icons: ParsedIcon[]): string[] {
  return icons.map((icon) => icon.id);
}

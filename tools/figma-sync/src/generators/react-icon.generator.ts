import type { ParsedIcon } from '../parsers/icons.parser.js';

/**
 * Clean and optimize SVG content for React
 */
function cleanSvg(svg: string): string {
  return (
    svg
      // Remove XML declaration
      .replace(/<\?xml[^>]*\?>/g, '')
      // Remove comments
      .replace(/<!--[\s\S]*?-->/g, '')
      // Convert attributes to React format
      .replace(/fill-rule/g, 'fillRule')
      .replace(/clip-rule/g, 'clipRule')
      .replace(/stroke-width/g, 'strokeWidth')
      .replace(/stroke-linecap/g, 'strokeLinecap')
      .replace(/stroke-linejoin/g, 'strokeLinejoin')
      .replace(/stroke-miterlimit/g, 'strokeMiterlimit')
      .replace(/font-family/g, 'fontFamily')
      .replace(/font-size/g, 'fontSize')
      // Remove fixed width/height (we'll use props)
      .replace(/\s+width="[^"]*"/g, '')
      .replace(/\s+height="[^"]*"/g, '')
      // Add our props
      .replace('<svg', '<svg\n      ref={ref}\n      width={size}\n      height={size}')
      // Replace fill with prop
      .replace(/fill="(?!none)[^"]*"/g, 'fill={color}')
      // Replace stroke with prop
      .replace(/stroke="(?!none)[^"]*"/g, 'stroke={color}')
      .trim()
  );
}

/**
 * Generate React component from SVG
 */
export function generateReactIcon(icon: ParsedIcon, svgContent: string): string {
  const cleanedSvg = cleanSvg(svgContent);

  return `import * as React from "react";
import type { IconProps } from "../src/Icon";

export const ${icon.componentName} = React.forwardRef<SVGSVGElement, IconProps>(
  ({ size = 24, color = "currentColor", ...props }, ref) => (
    ${cleanedSvg.replace('<svg', '<svg {...props}')}
  )
);

${icon.componentName}.displayName = "${icon.componentName}";
`;
}

/**
 * Generate index file for all icons
 */
export function generateIconsIndex(icons: ParsedIcon[]): string {
  const lines: string[] = [];

  for (const icon of icons) {
    lines.push(`export { ${icon.componentName} } from "./${icon.componentName}";`);
  }

  return lines.join('\n');
}

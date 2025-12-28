import * as React from 'react';

export interface IconProps extends React.SVGProps<SVGSVGElement> {
  /**
   * Icon size in pixels
   * @default 24
   */
  size?: number;
  /**
   * Icon color
   * @default "currentColor"
   */
  color?: string;
}

export interface IconComponent extends React.ForwardRefExoticComponent<IconProps & React.RefAttributes<SVGSVGElement>> {
  displayName?: string;
}

/**
 * Base Icon wrapper component
 * Use this to create custom icons or wrap SVGs
 */
export const Icon = React.forwardRef<SVGSVGElement, IconProps>(({ size = 24, color = 'currentColor', children, ...props }, ref) => (
  <svg ref={ref} width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color={color} {...props}>
    {children}
  </svg>
));

Icon.displayName = 'Icon';

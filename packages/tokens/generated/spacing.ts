/**
 * AUTO-GENERATED FILE - DO NOT EDIT
 * Source: Figma Design System
 * Generated: 2025-01-01T00:00:00Z
 */

export const spacing = {
  0: "0px",
  1: "4px",
  2: "8px",
  3: "12px",
  4: "16px",
  5: "20px",
  6: "24px",
  8: "32px",
  10: "40px",
  12: "48px",
  16: "64px",
  20: "80px",
  24: "96px",
} as const;

export const spacingSemantic = {
  xs: spacing[1],
  sm: spacing[2],
  md: spacing[4],
  lg: spacing[6],
  xl: spacing[8],
  "2xl": spacing[12],
} as const;

export type Spacing = typeof spacing;
export type SpacingSemantic = typeof spacingSemantic;

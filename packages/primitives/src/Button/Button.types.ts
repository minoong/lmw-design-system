import * as React from "react";

export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonContextValue {
  disabled: boolean;
  size: ButtonSize;
}

export interface ButtonRootProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Render as child element (Slot pattern)
   */
  asChild?: boolean;
  /**
   * Button size
   * @default "md"
   */
  size?: ButtonSize;
}

export interface ButtonIconProps extends React.HTMLAttributes<HTMLSpanElement> {
  /**
   * Render as child element (Slot pattern)
   */
  asChild?: boolean;
}

export interface ButtonLabelProps
  extends React.HTMLAttributes<HTMLSpanElement> {
  /**
   * Render as child element (Slot pattern)
   */
  asChild?: boolean;
}

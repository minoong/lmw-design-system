import * as React from "react";
import { Button as ButtonPrimitive } from "@lmw-design-system/primitives";
import type { ButtonRootProps } from "@lmw-design-system/primitives";
import styles from "./Button.module.scss";

export type ButtonVariant = "primary" | "secondary" | "ghost";

export interface ButtonProps extends ButtonRootProps {
  /**
   * Button visual variant
   * @default "primary"
   */
  variant?: ButtonVariant;
}

/**
 * Styled Button Component
 *
 * Combines primitives with design tokens for a fully styled button.
 *
 * @example
 * ```tsx
 * <Button variant="primary" size="md">
 *   Click me
 * </Button>
 * ```
 *
 * @example with icon
 * ```tsx
 * <Button variant="secondary" size="lg">
 *   <Button.Icon><IconPlus /></Button.Icon>
 *   <Button.Label>Add Item</Button.Label>
 * </Button>
 * ```
 */
const ButtonRoot = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", className, ...props }, ref) => {
    const variantClass = styles[variant];
    const combinedClassName = [styles.button, variantClass, className]
      .filter(Boolean)
      .join(" ");

    return (
      <ButtonPrimitive.Root
        ref={ref}
        className={combinedClassName}
        {...props}
      />
    );
  }
);

ButtonRoot.displayName = "Button";

/**
 * Button Compound Component with styled variants
 */
export const Button = Object.assign(ButtonRoot, {
  Icon: ButtonPrimitive.Icon,
  Label: ButtonPrimitive.Label,
});

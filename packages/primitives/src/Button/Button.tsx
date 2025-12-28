import * as React from "react";
import { Slot } from "../utils/Slot";
import { ButtonContext, useButtonContext } from "./ButtonContext";
import type {
  ButtonRootProps,
  ButtonIconProps,
  ButtonLabelProps,
} from "./Button.types";

/**
 * Button.Root - The root button component
 * Provides context to child components
 */
const ButtonRoot = React.forwardRef<HTMLButtonElement, ButtonRootProps>(
  (
    { children, disabled = false, size = "md", asChild, className, ...props },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";

    return (
      <ButtonContext.Provider value={{ disabled, size }}>
        <Comp
          ref={ref}
          disabled={disabled}
          data-disabled={disabled ? "" : undefined}
          data-size={size}
          className={className}
          {...props}
        >
          {children}
        </Comp>
      </ButtonContext.Provider>
    );
  }
);

ButtonRoot.displayName = "Button.Root";

/**
 * Button.Icon - Icon slot within button
 * Automatically adjusts size based on button context
 */
const ButtonIcon = React.forwardRef<HTMLSpanElement, ButtonIconProps>(
  ({ children, asChild, className, ...props }, ref) => {
    const { size } = useButtonContext();
    const Comp = asChild ? Slot : "span";

    return (
      <Comp
        ref={ref}
        data-size={size}
        data-slot="icon"
        className={className}
        {...props}
      >
        {children}
      </Comp>
    );
  }
);

ButtonIcon.displayName = "Button.Icon";

/**
 * Button.Label - Label slot within button
 * Use for button text content
 */
const ButtonLabel = React.forwardRef<HTMLSpanElement, ButtonLabelProps>(
  ({ children, asChild, className, ...props }, ref) => {
    const { size } = useButtonContext();
    const Comp = asChild ? Slot : "span";

    return (
      <Comp
        ref={ref}
        data-size={size}
        data-slot="label"
        className={className}
        {...props}
      >
        {children}
      </Comp>
    );
  }
);

ButtonLabel.displayName = "Button.Label";

/**
 * Button Compound Component
 *
 * @example
 * ```tsx
 * <Button.Root size="md">
 *   <Button.Icon><IconPlus /></Button.Icon>
 *   <Button.Label>Add Item</Button.Label>
 * </Button.Root>
 * ```
 *
 * @example with asChild
 * ```tsx
 * <Button.Root asChild>
 *   <a href="/link">Link Button</a>
 * </Button.Root>
 * ```
 */
export const Button = {
  Root: ButtonRoot,
  Icon: ButtonIcon,
  Label: ButtonLabel,
};

export type { ButtonRootProps, ButtonIconProps, ButtonLabelProps };

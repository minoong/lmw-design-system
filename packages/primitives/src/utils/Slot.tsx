import * as React from 'react';
import { composeRefs } from './composeRefs';

interface SlotProps extends React.HTMLAttributes<HTMLElement> {
  children?: React.ReactNode;
}

interface SlotCloneProps {
  children: React.ReactElement;
}

function isSlottable(child: React.ReactNode): child is React.ReactElement {
  return React.isValidElement(child);
}

/**
 * Slot component for composition (asChild pattern)
 * Merges its props onto its immediate child
 */
export const Slot = React.forwardRef<HTMLElement, SlotProps>((props, forwardedRef) => {
  const { children, ...slotProps } = props;

  if (!isSlottable(children)) {
    return null;
  }

  return (
    <SlotClone {...slotProps} ref={forwardedRef}>
      {children}
    </SlotClone>
  );
});

Slot.displayName = 'Slot';

/**
 * SlotClone handles merging props and ref onto child
 */
const SlotClone = React.forwardRef<HTMLElement, SlotCloneProps & SlotProps>((props, forwardedRef) => {
  const { children, ...slotProps } = props;

  if (!React.isValidElement(children)) {
    return null;
  }

  const childRef = (children as React.ReactElement & { ref?: React.Ref<unknown> }).ref;

  return React.cloneElement(children, {
    ...mergeProps(slotProps, children.props as Record<string, unknown>),
    // @ts-expect-error - ref handling
    ref: forwardedRef ? composeRefs(forwardedRef, childRef) : childRef,
  });
});

SlotClone.displayName = 'SlotClone';

/**
 * Merge slot props with child props
 */
function mergeProps(slotProps: Record<string, unknown>, childProps: Record<string, unknown>): Record<string, unknown> {
  const overrideProps: Record<string, unknown> = { ...childProps };

  for (const propName in childProps) {
    const slotPropValue = slotProps[propName];
    const childPropValue = childProps[propName];

    const isHandler = /^on[A-Z]/.test(propName);

    if (isHandler) {
      // Compose event handlers
      if (slotPropValue && childPropValue) {
        overrideProps[propName] = (...args: unknown[]) => {
          (childPropValue as (...args: unknown[]) => void)(...args);
          (slotPropValue as (...args: unknown[]) => void)(...args);
        };
      } else if (slotPropValue) {
        overrideProps[propName] = slotPropValue;
      }
    } else if (propName === 'style') {
      // Merge styles
      overrideProps[propName] = {
        ...(slotPropValue as object),
        ...(childPropValue as object),
      };
    } else if (propName === 'className') {
      // Merge classNames
      overrideProps[propName] = [slotPropValue, childPropValue].filter(Boolean).join(' ');
    }
  }

  return { ...slotProps, ...overrideProps };
}

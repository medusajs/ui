import { VariantProps, cva } from "class-variance-authority"
import * as React from "react"

import { clx } from "@/utils/clx"
import { Spinner } from "@medusajs/icons"
import { Slot } from "@radix-ui/react-slot"

const iconButtonVariants = cva(
  clx(
    "transition-fg relative inline-flex w-fit items-center justify-center overflow-hidden rounded-md border outline-none",
    "disabled:bg-ui-bg-disabled disabled:border-ui-border-base disabled:text-ui-fg-disabled disabled:!shadow-none disabled:after:hidden",
    "after:absolute after:inset-0 after:content-['']"
  ),
  {
    variants: {
      variant: {
        primary: clx(
          "shadow-buttons-neutral text-ui-fg-base border-ui-border-base bg-ui-button-neutral after:button-neutral-gradient",
          "hover:bg-ui-button-neutral-hover hover:after:button-neutral-hover-gradient",
          "active:bg-ui-button-neutral-pressed active:after:button-neutral-pressed-gradient",
          "focus:shadow-buttons-neutral-focus"
        ),
        transparent: clx(
          "text-ui-fg-base border-ui-border-transparent bg-ui-button-transparent",
          "hover:bg-ui-button-transparent-hover",
          "active:bg-ui-button-transparent-pressed active:border-ui-border-base",
          "focus:shadow-borders-focus focus:bg-ui-bg-base focus:border-ui-border-base",
          "disabled:!border-none disabled:!bg-transparent disabled:!shadow-none"
        ),
      },
      size: {
        base: "h-8 w-8 p-[5px]",
        large: "h-10 w-10 p-[9px]",
        xlarge: "h-12 w-12 p-[13px]",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "base",
    },
  }
)

interface IconButtonProps
  extends React.ComponentPropsWithoutRef<"button">,
    VariantProps<typeof iconButtonVariants> {
  asChild?: boolean
  isLoading?: boolean
}

const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    {
      variant = "primary",
      size = "base",
      asChild = false,
      className,
      children,
      isLoading = false,
      disabled,
      ...props
    },
    ref
  ) => {
    const Component = asChild ? Slot : "button"

    /**
     * In the case of a button where asChild is true, and isLoading is true, we ensure that
     * only on element is passed as a child to the Slot component. This is because the Slot
     * component only accepts a single child.
     */
    const renderInner = () => {
      if (isLoading) {
        return (
          <span className="pointer-events-none">
            <div
              className={clx(
                "bg-ui-bg-disabled absolute inset-0 z-[2] flex items-center justify-center rounded-md"
              )}
            >
              <Spinner className="animate-spin" />
            </div>
            {children}
          </span>
        )
      }

      return children
    }

    return (
      <Component
        ref={ref}
        {...props}
        className={clx(iconButtonVariants({ variant, size }), className)}
        disabled={disabled || isLoading}
      >
        {renderInner()}
      </Component>
    )
  }
)
IconButton.displayName = "IconButton"

export { IconButton, iconButtonVariants }

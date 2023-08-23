import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import * as React from "react"

import { clx } from "@/utils/clx"
import { Spinner } from "@medusajs/icons"

const buttonVariants = cva(
  "disabled:bg-ui-bg-disabled disabled:border-ui-border-base disabled:text-ui-fg-disabled transition-fg relative inline-flex w-fit items-center justify-center overflow-hidden rounded-lg border outline-none after:absolute after:inset-0 after:content-[''] disabled:!shadow-none disabled:after:hidden",
  {
    variants: {
      variant: {
        primary: clx(
          "shadow-buttons-colored text-ui-fg-on-inverted border-ui-border-loud bg-ui-button-inverted after:button-inverted-gradient",
          "hover:bg-ui-button-inverted-hover hover:after:button-inverted-hover-gradient",
          "active:bg-ui-button-inverted-pressed active:after:button-inverted-pressed-gradient",
          "focus:!shadow-buttons-colored-focus"
        ),
        secondary: clx(
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
          "disabled:bg-transparent disabled:shadow-none"
        ),
        danger: clx(
          "shadow-buttons-neutral text-ui-fg-on-color border-ui-border-danger bg-ui-button-danger after:button-danger-gradient",
          "hover:bg-ui-button-danger-hover hover:after:button-danger-hover-gradient",
          "active:bg-ui-button-danger-pressed active:after:button-danger-pressed-gradient",
          "focus:shadow-buttons-neutral-focus"
        ),
      },
      size: {
        small: "txt-compact-xsmall-plus gap-x-0.5 px-[7px] py-[1px]",
        base: "txt-compact-small-plus gap-x-1.5 px-[11px] py-[5px]",
        large: "txt-compact-medium-plus gap-x-2 px-[15px] py-[9px]",
        xlarge: "txt-compact-large-plus gap-x-2 px-[19px] py-[13px]",
      },
      format: {
        default: "",
        icon: "",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "base",
      format: "default",
    },
    compoundVariants: [
      {
        size: "small",
        format: "icon",
        className: "px-px py-px",
      },
      {
        size: "base",
        format: "icon",
        className: "px-[5px] py-[5px]",
      },
      {
        size: "large",
        format: "icon",
        className: "px-[9px] py-[9px]",
      },
      {
        size: "xlarge",
        format: "icon",
        className: "px-[13px] py-[13px]",
      },
    ],
  }
)

interface ButtonProps
  extends React.ComponentPropsWithoutRef<"button">,
    VariantProps<typeof buttonVariants> {
  isLoading?: boolean
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      size,
      variant,
      format,
      className,
      asChild = false,
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
                "bg-ui-bg-disabled absolute inset-0 z-[1] flex items-center justify-center rounded-md"
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
        className={clx(buttonVariants({ variant, size, format }), className)}
        disabled={disabled || isLoading}
      >
        {renderInner()}
      </Component>
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }

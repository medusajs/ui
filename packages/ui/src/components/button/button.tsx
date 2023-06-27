import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import * as React from "react"

import { labelVariants } from "@/components/label"
import { clx } from "@/utils/clx"

const buttonVariants = cva(
  "outline-none focus:ring-2 ring-offset-2 ring-[#0081F1] rounded-lg transition-colors disabled:bg-disabled disabled:border-base disabled:text-disabled border inline-flex items-center",
  {
    variants: {
      variant: {
        brand:
          "text-on-color border-colored-button bg-button-brand hover:bg-button-brand-hover active:bg-button-brand-active",
        neutral:
          "text-base bg-button-neutral hover:bg-button-neutral-hover active:bg-button-neutral-active",
        inverted:
          "text-on-color bg-button-inverted hover:bg-button-inverted-hover active:bg-button-inverted-active border-colored-button",
        transparent:
          "text-base border-transparent bg-button-transparent hover:bg-button-transparent-hover hover:border-neutral-button focus:bg-button-neutral focus:border-neutral-button active:border-neutral-button active:bg-button-transparent-active",
        danger:
          "text-on-color border-colored-button bg-button-danger hover:bg-button-danger-hover active:bg-button-danger-active",
      },
      size: {
        sm: clx(
          "px-[7px] py-[1px] gap-x-0.5",
          labelVariants({ variant: "xs", weight: "plus" })
        ),
        md: clx(
          "px-[11px] py-[5px] gap-x-4",
          labelVariants({ variant: "sm", weight: "plus" })
        ),
        lg: clx(
          "px-[15px] py-[9px] gap-x-2",
          labelVariants({ variant: "md", weight: "plus" })
        ),
        xl: clx(
          "px-[19px] py-[13px] gap-x-2",
          labelVariants({
            variant: "lg",
            weight: "plus",
          })
        ),
      },
    },
    defaultVariants: {
      variant: "brand",
      size: "md",
    },
  }
)

interface ButtonProps
  extends React.ComponentPropsWithoutRef<"button">,
    VariantProps<typeof buttonVariants> {
  loading?: boolean
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ size, variant, className, asChild = false, children, ...props }, ref) => {
    const Component = asChild ? Slot : "button"

    return (
      <Component
        ref={ref}
        {...props}
        className={clx(buttonVariants({ variant, size }), className)}
      >
        {children}
      </Component>
    )
  }
)
Button.displayName = "Button"

export { Button }

import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import * as React from "react"

import { clx } from "@/utils/clx"

const buttonVariants = cva(
  "outline-none focus:ring-2 ring-offset-2 ring-[#0081F1] rounded-lg transition-colors",
  {
    variants: {
      variant: {
        brand: "",
        neutral: "",
        inverted: "",
        transparent: "",
        danger: "",
      },
      size: {
        sm: "px-[7px] py-[1px]",
        md: "px-[11px] py-[5px]",
        lg: "px-[15px] py-[9px]",
        xl: "px-[19px] py-[13px]",
      },
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
  ({ size, variant, className, asChild = false, ...props }, ref) => {
    const Component = asChild ? Slot : "button"

    return (
      <Component
        ref={ref}
        {...props}
        className={clx(buttonVariants({ variant, size }), className)}
      />
    )
  }
)
Button.displayName = "Button"

export { Button }

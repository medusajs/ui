import { Slot } from "@radix-ui/react-slot"
import { VariantProps, cva } from "class-variance-authority"
import * as React from "react"

import { clx } from "@/utils/clx"

const textVariants = cva("", {
  variants: {
    variant: {
      md: "text-[14px]/[24px]",
      lg: "text-[16px]/[28px]",
      xl: "text-[18px]/[32px]",
    },
    weight: {
      regular: "font-normal",
      plus: "font-medium",
    },
    family: {
      sans: "font-sans",
      mono: "font-mono",
    },
  },
  defaultVariants: {
    family: "sans",
    variant: "md",
    weight: "regular",
  },
})

interface TextProps
  extends React.ComponentPropsWithoutRef<"p">,
    VariantProps<typeof textVariants> {
  asChild?: boolean
}

const Text = React.forwardRef<HTMLParagraphElement, TextProps>(
  (
    { className, asChild = false, variant, weight, family, children, ...props },
    ref
  ) => {
    const Component = asChild ? Slot : "p"

    return (
      <Component
        ref={ref}
        className={clx(textVariants({ variant, weight, family }), className)}
        {...props}
      >
        {children}
      </Component>
    )
  }
)
Text.displayName = "Text"

export { Text, textVariants }

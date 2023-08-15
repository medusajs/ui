import { Slot } from "@radix-ui/react-slot"
import { VariantProps, cva } from "class-variance-authority"
import * as React from "react"

import { clx } from "@/utils/clx"

const textVariants = cva("", {
  variants: {
    size: {
      xsmall: "txt-compact-xsmall",
      small: "txt-compact-small",
      base: "txt-medium",
      large: "txt-large",
      xlarge: "txt-xlarge",
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
    size: "base",
    weight: "regular",
  },
})

interface TextProps
  extends React.ComponentPropsWithoutRef<"p">,
    VariantProps<typeof textVariants> {
  asChild?: boolean
  as?: "p" | "span" | "div"
}

const Text = React.forwardRef<HTMLParagraphElement, TextProps>(
  (
    {
      className,
      asChild = false,
      as = "p",
      size = "base",
      weight = "regular",
      family = "sans",
      children,
      ...props
    },
    ref
  ) => {
    const Component = asChild ? Slot : as

    return (
      <Component
        ref={ref}
        className={clx(textVariants({ size, weight, family }), className)}
        {...props}
      >
        {children}
      </Component>
    )
  }
)
Text.displayName = "Text"

export { Text }

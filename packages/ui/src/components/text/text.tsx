import { Slot } from "@radix-ui/react-slot"
import { VariantProps, cva } from "class-variance-authority"
import * as React from "react"

import { clx } from "@/utils/clx"

const textVariants = cva("", {
  variants: {
    size: {
      base: "text-sm leading-6",
      large: "text-base leading-7",
      xlarge: "text-lg leading-8",
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
}

const Text = React.forwardRef<HTMLParagraphElement, TextProps>(
  (
    {
      className,
      asChild = false,
      size = "base",
      weight = "regular",
      family = "sans",
      children,
      ...props
    },
    ref
  ) => {
    const Component = asChild ? Slot : "p"

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

export { Text, textVariants }

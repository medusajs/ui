import * as Primitives from "@radix-ui/react-label"
import { cva, type VariantProps } from "class-variance-authority"
import * as React from "react"

import { clx } from "@/utils/clx"

const labelVariants = cva("font-sans", {
  variants: {
    size: {
      xsmall: "text-[12px]/[20px]",
      small: "text-[13px]/[20px]",
      base: "text-[14px]/[20px]",
      large: "text-[16px]/[20px]",
    },
    weight: {
      regular: "font-normal",
      plus: "font-medium",
    },
  },
  defaultVariants: {
    size: "base",
    weight: "regular",
  },
})

interface LabelProps
  extends React.ComponentPropsWithoutRef<"label">,
    VariantProps<typeof labelVariants> {}

const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({ className, size = "base", weight = "regular", ...props }, ref) => {
    return (
      <Primitives.Root
        ref={ref}
        className={clx(labelVariants({ size, weight }), className)}
        {...props}
      />
    )
  }
)
Label.displayName = "Label"

export { Label, labelVariants }

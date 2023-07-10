import * as Primitives from "@radix-ui/react-label"
import { cva, type VariantProps } from "class-variance-authority"
import * as React from "react"

import { clx } from "@/utils/clx"

const labelVariants = cva("font-sans", {
  variants: {
    variant: {
      xs: "text-[12px]/[20px]",
      sm: "text-[13px]/[20px]",
      md: "text-[14px]/[20px]",
      lg: "text-[16px]/[20px]",
    },
    weight: {
      regular: "font-normal",
      plus: "font-medium",
    },
  },
  defaultVariants: {
    variant: "md",
    weight: "regular",
  },
})

interface LabelProps
  extends React.ComponentPropsWithoutRef<"label">,
    VariantProps<typeof labelVariants> {}

const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({ className, variant, weight, ...props }, ref) => {
    return (
      <Primitives.Root
        ref={ref}
        className={clx(labelVariants({ variant, weight }), className)}
        {...props}
      />
    )
  }
)
Label.displayName = "Label"

export { Label, labelVariants }

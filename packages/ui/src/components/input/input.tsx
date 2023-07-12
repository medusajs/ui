import { cva } from "class-variance-authority"
import * as React from "react"

import { labelVariants } from "@/components/label"
import { clx } from "@/utils/clx"

const inputVariants = cva(
  "bg-ui-bg-subtle hover:bg-ui-bg-subtle-hover border-ui-border-loud-muted invalid:!border-ui-border-error invalid:focus:!shadow-borders-error disabled:text-ui-fg-disabled disabled:!bg-ui-bg-disabled disabled:!border-ui-border-base focus:border-ui-border-interactive focus:shadow-borders-active placeholder:text-ui-fg-muted text-ui-fg-base relative w-full rounded-md border outline-none transition-all disabled:cursor-not-allowed disabled:!shadow-none",
  {
    variants: {
      size: {
        base: "h-10 px-3 py-[9px]",
        small: "h-8",
      },
    },
  }
)

const Input = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, ...props }, ref) => {
  return (
    <input
      ref={ref}
      className={clx(
        inputVariants({ size: "base" }),
        labelVariants({ variant: "md" }),
        className
      )}
      {...props}
    />
  )
})
Input.displayName = "Input"

export { Input }

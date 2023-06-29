import * as React from "react"

import { labelVariants } from "@/components/label"
import { clx } from "@/utils/clx"

const Input = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, ...props }, ref) => {
  return (
    <input
      ref={ref}
      className={clx(
        "outline-none focus:ring-2 ring-interactive ring-offset-2 transition-all h-10 bg-field hover:bg-field-hover text-default placeholder:text-muted rounded-lg px-4 border border-base disabled:bg-disabled disabled:text-disabled disabled:placeholder:text-disabled",
        labelVariants({ variant: "md" }),
        className
      )}
      {...props}
    />
  )
})
Input.displayName = "Input"

export { Input }

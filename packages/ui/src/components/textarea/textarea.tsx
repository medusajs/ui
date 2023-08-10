import * as React from "react"

import { clx } from "@/utils/clx"

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.ComponentPropsWithoutRef<"textarea">
>(({ className, ...props }, ref) => {
  return (
    <textarea
      ref={ref}
      className={clx(
        "txt-medium bg-ui-bg-subtle focus:shadow-borders-active focus:border-ui-border-interactive border-ui-border-loud-muted shadow-buttons-secondary placeholder:text-ui-fg-muted min-h-[70px] w-full rounded-md border px-3 py-[7px] outline-none transition-colors",
        className
      )}
      {...props}
    />
  )
})
Textarea.displayName = "Textarea"

export { Textarea }

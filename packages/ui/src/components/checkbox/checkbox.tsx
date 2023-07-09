import * as Primitives from "@radix-ui/react-checkbox"
import * as React from "react"

import { clx } from "@/utils/clx"
import { CheckMini, MinusMini } from "@medusajs/icons"

const Checkbox = React.forwardRef<
  React.ElementRef<typeof Primitives.Root>,
  React.ComponentPropsWithoutRef<typeof Primitives.Root>
>(({ className, checked, ...props }, ref) => {
  return (
    <Primitives.Root
      {...props}
      ref={ref}
      checked={checked}
      className={clx(
        "group relative w-5 h-5 outline-none inline-flex items-center justify-center ",
        className
      )}
    >
      <div className="w-[14px] h-[14px] rounded-[3px] text-ui-fg-on-color bg-ui-bg-base shadow-borders-base-w-shadow transition-all group-hover:shadow-borders-strong-w-shadow group-focus:!shadow-borders-interactive-w-focus group-data-[state=checked]:bg-ui-bg-interactive group-data-[state=checked]:shadow-borders-interactive group-data-[state=indeterminate]:bg-ui-bg-interactive group-data-[state=indeterminate]:shadow-borders-interactive [&_path]:shadow-details-contrast-on-bg-interactive group-disabled:text-ui-fg-disabled group-disabled:!bg-ui-bg-disabled group-disabled:!shadow-form-border-base">
        <Primitives.Indicator className="absolute inset-0">
          {checked === "indeterminate" ? <MinusMini /> : <CheckMini />}
        </Primitives.Indicator>
      </div>
    </Primitives.Root>
  )
})
Checkbox.displayName = "Checkbox"

export { Checkbox }

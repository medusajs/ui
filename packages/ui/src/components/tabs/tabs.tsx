import * as Primitives from "@radix-ui/react-tabs"
import * as React from "react"

import { clx } from "@/utils/clx"

const Root = Primitives.Root

const PillTrigger = React.forwardRef<
  React.ElementRef<typeof Primitives.Trigger>,
  React.ComponentPropsWithoutRef<typeof Primitives.Trigger>
>(({ className, children, ...props }, ref) => (
  <Primitives.Trigger
    ref={ref}
    className={clx(
      "inline-flex items-center justify-center rounded-full px-2 py-1 text-xs font-medium leading-4",
      className
    )}
    {...props}
  >
    {children}
  </Primitives.Trigger>
))
PillTrigger.displayName = "Tabs.PillTrigger"

const ProgressTrigger = React.forwardRef<
  React.ElementRef<typeof Primitives.Trigger>,
  React.ComponentPropsWithoutRef<typeof Primitives.Trigger>
>(({ className, children, ...props }, ref) => (
  <Primitives.Trigger
    ref={ref}
    className={clx(
      "inline-flex items-center justify-center rounded-full px-2 py-1 text-xs font-medium leading-4",
      className
    )}
    {...props}
  >
    {children}
  </Primitives.Trigger>
))
ProgressTrigger.displayName = "Tabs.ProgressTrigger"

const Tabs = Object.assign(Root, {
  PillTrigger: PillTrigger,
  ProgressTrigger: ProgressTrigger,
})

export { Tabs }

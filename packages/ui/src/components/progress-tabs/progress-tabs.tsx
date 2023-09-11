"use client"

import {
  CheckCircleSolid,
  CircleDottedLine,
  CircleHalfSolid,
} from "@medusajs/icons"
import * as ProgressTabsPrimitives from "@radix-ui/react-tabs"
import * as React from "react"

import { clx } from "@/utils/clx"

const ProgressTabsRoot = ProgressTabsPrimitives.Root
ProgressTabsRoot.displayName = "ProgressTabs"

const ProgressTabsTrigger = React.forwardRef<
  React.ElementRef<typeof ProgressTabsPrimitives.Trigger>,
  React.ComponentPropsWithoutRef<typeof ProgressTabsPrimitives.Trigger>
>(({ className, children, ...props }, ref) => (
  <ProgressTabsPrimitives.Trigger
    ref={ref}
    className={clx(
      "txt-compact-small-plus transition-fg text-ui-fg-muted bg-ui-bg-subtle border-r-ui-border-base inline-flex h-14 w-full max-w-[200px] flex-1 items-center gap-x-2 border-r px-4 text-left outline-none",
      "group/trigger overflow-hidden whitespace-nowrap",
      "disabled:bg-ui-bg-disabled disabled:text-ui-fg-muted",
      "hover:bg-ui-bg-subtle-hover",
      "focus:bg-ui-bg-base focus:z-[1]",
      "data-[state=active]:text-ui-fg-base data-[state=active]:bg-ui-bg-base",
      className
    )}
    {...props}
  >
    {children}
  </ProgressTabsPrimitives.Trigger>
))
ProgressTabsTrigger.displayName = "ProgressTabs.Trigger"

interface IndicatorProps
  extends Omit<React.ComponentPropsWithoutRef<"span">, "children"> {
  status?: "not_started" | "in_progress" | "completed"
}

const ProgressTabsIndicator = React.forwardRef<HTMLSpanElement, IndicatorProps>(
  ({ status, className, ...props }, ref) => {
    const Icon = React.useMemo(() => {
      switch (status) {
        case "not_started":
          return CircleDottedLine
        case "in_progress":
          return CircleHalfSolid
        case "completed":
          return CheckCircleSolid
        default:
          return CircleDottedLine
      }
    }, [status])

    return (
      <span
        ref={ref}
        className={clx(
          "text-ui-fg-muted group-data-[state=active]/trigger:text-ui-fg-interactive",
          className
        )}
        {...props}
      >
        <Icon />
      </span>
    )
  }
)
ProgressTabsIndicator.displayName = "ProgressTabs.Indicator"

const ProgressTabsList = React.forwardRef<
  React.ElementRef<typeof ProgressTabsPrimitives.List>,
  React.ComponentPropsWithoutRef<typeof ProgressTabsPrimitives.List>
>(({ className, ...props }, ref) => (
  <ProgressTabsPrimitives.List
    ref={ref}
    className={clx("flex items-center", className)}
    {...props}
  />
))
ProgressTabsList.displayName = "ProgressTabs.List"

const ProgressTabsContent = ProgressTabsPrimitives.Content
ProgressTabsContent.displayName = "ProgressTabs.Content"

const ProgressTabs = Object.assign(ProgressTabsRoot, {
  Trigger: ProgressTabsTrigger,
  List: ProgressTabsList,
  Content: ProgressTabsContent,
  Indicator: ProgressTabsIndicator,
})

export { ProgressTabs }

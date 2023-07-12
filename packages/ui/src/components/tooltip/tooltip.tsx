import * as Primitives from "@radix-ui/react-tooltip"
import * as React from "react"

import { labelVariants } from "@/components/label"
import { clx } from "@/utils/clx"

export type TooltipProps = Primitives.TooltipContentProps &
  Pick<
    Primitives.TooltipProps,
    "open" | "defaultOpen" | "onOpenChange" | "delayDuration"
  > & {
    content: React.ReactNode
    side?: "bottom" | "left" | "top" | "right"
    onClick?: React.ButtonHTMLAttributes<HTMLButtonElement>["onClick"]
    maxWidth?: number
  }

const Tooltip = ({
  children,
  content,
  open,
  defaultOpen,
  onOpenChange,
  delayDuration,
  maxWidth = 220,
  className,
  side,
  sideOffset = 4,
  onClick,
  ...props
}: TooltipProps) => {
  return (
    <Primitives.Provider delayDuration={100}>
      <Primitives.Root
        open={open}
        defaultOpen={defaultOpen}
        onOpenChange={onOpenChange}
        delayDuration={delayDuration}
      >
        <Primitives.Trigger onClick={onClick} asChild>
          {children}
        </Primitives.Trigger>
        <Primitives.Portal>
          <Primitives.Content
            side={side}
            sideOffset={sideOffset}
            align="center"
            className={clx(
              "text-ui-fg-subtle animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 bg-ui-bg-base shadow-elevation-tooltip z-[999] rounded-lg px-3 py-2",
              labelVariants({ size: "xsmall", weight: "plus" }),
              className
            )}
            {...props}
            style={{ ...props.style, maxWidth }}
          >
            {content}
          </Primitives.Content>
        </Primitives.Portal>
      </Primitives.Root>
    </Primitives.Provider>
  )
}

export { Tooltip }

import * as Primitives from "@radix-ui/react-tooltip"

import React from "react"
import clsx from "clsx"
import Kbd, { KbdContainer } from "../kbd/kbd"

export type TooltipProps = Primitives.TooltipContentProps &
  Pick<
    Primitives.TooltipProps,
    "open" | "defaultOpen" | "onOpenChange" | "delayDuration"
  > & {
    content: React.ReactNode
    side?: "bottom" | "left" | "top" | "right"
    onClick?: React.ButtonHTMLAttributes<HTMLButtonElement>["onClick"]
    maxWidth?: number
    shortcut?: string[]
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
  onClick,
  shortcut,
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
        <Primitives.Trigger onClick={onClick} asChild={true}>
          <span>{children}</span>
        </Primitives.Trigger>
        <Primitives.Portal>
          <Primitives.Content
            side={side ?? "bottom"}
            sideOffset={10}
            align="center"
            className={clsx(
              "font-sans font-medium text-xs text-subtle z-[999]",
              "bg-button-neutral rounded-lg py-2 px-4 shadow-high",
              className
            )}
            {...props}
            style={{ ...props.style, maxWidth }}
          >
            {content}
            {shortcut && (
              <KbdContainer>
                {shortcut.map((key) => (
                  <Kbd key={key}>{key}</Kbd>
                ))}
              </KbdContainer>
            )}
          </Primitives.Content>
        </Primitives.Portal>
      </Primitives.Root>
    </Primitives.Provider>
  )
}

export default Tooltip
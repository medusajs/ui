import * as React from "react"

import { clx } from "@/utils/clx"

type KbdProps = React.ComponentPropsWithoutRef<"kbd">

const Kbd = React.forwardRef<HTMLElement, KbdProps>(
  ({ children, ...props }, ref) => {
    // Any instance in which this could be something else?
    const Component = "kbd"

    return (
      <>
        <Component
          ref={ref}
          {...props}
          className="text-ui-fg-subtle bg-button-neutral-active border-neutral-button inline-flex h-[20px] min-w-[20px] items-center justify-center rounded-md border px-1 font-sans text-xs font-medium"
        >
          {children}
        </Component>
      </>
    )
  }
)
Kbd.displayName = "Kbd"

type KbdContainerProps = React.ComponentPropsWithoutRef<"div">

const KbdContainer = React.forwardRef<HTMLDivElement, KbdContainerProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <div
        className={clx("ml-2 inline-flex gap-0.5", className)}
        ref={ref}
        {...props}
      >
        {children}
      </div>
    )
  }
)
KbdContainer.displayName = "KbdContainer"

export { Kbd, KbdContainer }

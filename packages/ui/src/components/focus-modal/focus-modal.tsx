import { XMark } from "@medusajs/icons"
import * as Primitives from "@radix-ui/react-dialog"
import * as React from "react"

import { Kbd } from "@/components/kbd"
import { clx } from "@/utils/clx"
import { Button } from "../button"

const Root = Primitives.Root
Root.displayName = "FocusModal.Root"

const Trigger = Primitives.Trigger
Trigger.displayName = "FocusModal.Trigger"

const Portal = ({ className, ...props }: Primitives.DialogPortalProps) => {
  return <Primitives.DialogPortal className={clx(className)} {...props} />
}
Portal.displayName = "FocusModal.Portal"

const Overlay = React.forwardRef<
  React.ElementRef<typeof Primitives.Overlay>,
  React.ComponentPropsWithoutRef<typeof Primitives.Overlay>
>(({ className, ...props }, ref) => {
  return (
    <Primitives.Overlay
      ref={ref}
      className={clx(
        "fixed inset-0 z-50",
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
        className
      )}
      {...props}
    />
  )
})
Overlay.displayName = "FocusModal.Overlay"

const Content = React.forwardRef<
  React.ElementRef<typeof Primitives.Content>,
  React.ComponentPropsWithoutRef<typeof Primitives.Content>
>(({ className, ...props }, ref) => {
  return (
    <Portal>
      <Overlay />
      <Primitives.Content
        ref={ref}
        className={clx(
          "bg-ui-bg-base shadow-elevation-modal fixed inset-2 z-50 flex flex-col rounded-lg border focus:outline-none",
          "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 duration-200",
          className
        )}
        {...props}
      />
    </Portal>
  )
})
Content.displayName = "FocusModal.Content"

const Header = ({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={clx(
        "border-ui-border-base flex items-start justify-between gap-x-4 border-b p-4",
        className
      )}
      {...props}
    >
      <div className="flex items-center gap-x-2">
        <Primitives.Close asChild>
          <Button variant="transparent" size={"sm"} format={"icon"}>
            <XMark />
          </Button>
        </Primitives.Close>
        <Kbd>esc</Kbd>
      </div>
      <div>{children}</div>
    </div>
  )
}
Header.displayName = "FocusModal.Header"

const Body = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  return <div className={clx("flex-1", className)} {...props} />
}
Body.displayName = "FocusModal.Body"

export const FocusModal = {
  Root,
  Trigger,
  Content,
  Header,
  Body,
}

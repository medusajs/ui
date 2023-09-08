"use client"

import { XMark } from "@medusajs/icons"
import * as Primitives from "@radix-ui/react-dialog"
import * as Tabs from "@radix-ui/react-tabs"
import * as React from "react"

import { IconButton } from "@/components/icon-button"
import { Kbd } from "@/components/kbd"
import { clx } from "@/utils/clx"

interface FocusModalProps
  extends React.ComponentPropsWithoutRef<typeof Primitives.Root> {
  defaultTab?: string
  tab?: string
  onTabChange?: (tab: string) => void
}

const Root = ({
  defaultTab,
  tab,
  onTabChange,
  children,
  ...props
}: FocusModalProps) => {
  return (
    <Primitives.Root {...props}>
      <Tabs.Root
        defaultValue={defaultTab}
        value={tab}
        onValueChange={onTabChange}
      >
        {children}
      </Tabs.Root>
    </Primitives.Root>
  )
}
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
        "bg-ui-bg-overlay fixed inset-0 z-50",
        // "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",  // Re-enable when Admin UI has been cleaned up
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
          // "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 duration-200",  // Re-enable when Admin UI has been cleaned up
          className
        )}
        {...props}
      />
    </Portal>
  )
})
Content.displayName = "FocusModal.Content"

const Header = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<"div">
>(({ children, className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={clx(
        "border-ui-border-base flex items-center justify-between gap-x-4 border-b px-4 py-2",
        className
      )}
      {...props}
    >
      <div className="flex items-center gap-x-2">
        <Primitives.Close asChild>
          <IconButton variant="transparent">
            <XMark />
          </IconButton>
        </Primitives.Close>
        <Kbd>esc</Kbd>
      </div>
      {children}
    </div>
  )
})
Header.displayName = "FocusModal.Header"

const Body = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<"div">
>(({ className, ...props }, ref) => {
  return <div ref={ref} className={clx("flex-1", className)} {...props} />
})
Body.displayName = "FocusModal.Body"

const TabsList = React.forwardRef<
  React.ElementRef<typeof Tabs.List>,
  React.ComponentPropsWithoutRef<typeof Tabs.List>
>(({ className, ...props }, ref) => {
  return (
    <Tabs.List
      ref={ref}
      className={clx("ml-2 flex w-full items-center", className)}
      {...props}
    />
  )
})
TabsList.displayName = "FocusModal.TabsList"

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof Tabs.Trigger>,
  React.ComponentPropsWithoutRef<typeof Tabs.Trigger>
>(({ className, type = "button", ...props }, ref) => {
  return (
    <Tabs.Trigger
      ref={ref}
      type={type}
      className={clx(
        "border-ui-border-base disabled:bg-ui-bg-disabled txt-compact-small-plus data-[state=active]:text-ui-fg-base data-[state=active]:bg-ui-bg-base bg-ui-bg-subtle hover:bg-ui-bg-subtle-hover text-ui-fg-muted transition-fg -my-2 flex min-w-[200px] items-center justify-start border-r px-4 py-[14px] first-of-type:border-l",
        className
      )}
      {...props}
    />
  )
})
TabsTrigger.displayName = "FocusModal.TabsTrigger"

const TabsContent = Tabs.Content
TabsContent.displayName = "FocusModal.TabsContent"

const FocusModal = Object.assign(Root, {
  Trigger,
  Content,
  Header,
  Body,
  TabsList,
  TabsTrigger,
  TabsContent,
})

export { FocusModal }

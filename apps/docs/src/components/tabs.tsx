"use client"

import * as React from "react"
import * as Primitives from "@radix-ui/react-tabs"
import { clx } from "@medusajs/ui"

const Tabs = Primitives.Root

const TabsList = React.forwardRef<
  React.ElementRef<typeof Primitives.List>,
  React.ComponentPropsWithoutRef<typeof Primitives.List>
>(({ className, ...props }, ref) => (
  <Primitives.List
    ref={ref}
    className={clx(
      "inline-flex h-10 w-full items-end justify-start rounded-none border-b bg-transparent p-0",
      className
    )}
    {...props}
  />
))
TabsList.displayName = "TabsList"

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof Primitives.Trigger>,
  React.ComponentPropsWithoutRef<typeof Primitives.Trigger>
>(({ className, ...props }, ref) => (
  <Primitives.Trigger
    ref={ref}
    className={clx(
      "ring-offset-background text-ui-fg-muted relative inline-flex h-9 items-center justify-center whitespace-nowrap rounded-sm border-b-2 border-b-transparent bg-transparent px-4 py-1.5 pb-3 pt-2 text-sm font-medium shadow-none transition-all focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
      "data-[state=active]:border-b-ui-border-loud data-[state=active]:text-ui-fg-base",
      className
    )}
    {...props}
  />
))
TabsTrigger.displayName = "TabsTrigger"

const TabsContent = React.forwardRef<
  React.ElementRef<typeof Primitives.Content>,
  React.ComponentPropsWithoutRef<typeof Primitives.Content>
>(({ className, ...props }, ref) => (
  <Primitives.Content
    ref={ref}
    className={clx(
      "mt-2 w-full rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
      className
    )}
    {...props}
  />
))
TabsContent.displayName = "TabsContent"

export { Tabs, TabsList, TabsTrigger, TabsContent }

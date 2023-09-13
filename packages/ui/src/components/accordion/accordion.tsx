import * as Primitves from "@radix-ui/react-accordion"
import * as React from "react"

import { clx } from "@/utils/clx"

const Root = (props: React.ComponentPropsWithoutRef<typeof Primitves.Root>) => {
  return <Primitves.Root {...props} />
}
Root.displayName = "Accordion"

const Item = React.forwardRef<
  React.ElementRef<typeof Primitves.Item>,
  React.ComponentPropsWithoutRef<typeof Primitves.Item>
>(({ className, ...props }, ref) => {
  return (
    <Primitves.Item
      ref={ref}
      className={clx(
        "border-ui-border-base border-b",
        "data-[state=open]:border-b-0",
        className
      )}
      {...props}
    />
  )
})
Item.displayName = "Accordion.Item"

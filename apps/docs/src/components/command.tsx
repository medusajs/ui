"use client"

import { Command as Primitive } from "@medusajs/ui"

type CommandProps = React.ComponentProps<"div">

const Command = ({ children, className, ...props }: CommandProps) => {
  return (
    <Primitive className={className} {...props}>
      <code className="code-body !text-ui-fg-on-color">{children}</code>
      <Primitive.Copy content="code" className="ml-auto" />
    </Primitive>
  )
}
export { Command }

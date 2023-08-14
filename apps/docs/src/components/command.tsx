"use client"

import { Command as Primitive } from "@medusajs/ui"
import { getRecursiveChildText } from "./snippet"
import { ReactElement } from "react"

type CommandProps = React.ComponentProps<"div">

const Command = ({ children, className, ...props }: CommandProps) => {
  const content = getRecursiveChildText(children as ReactElement)
  return (
    <Primitive className={className} {...props}>
      {children}
      {content && <Primitive.Copy content={content} className="ml-auto" />}
    </Primitive>
  )
}
export { Command }

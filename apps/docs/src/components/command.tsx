"use client"

import { Command as Primitive } from "@medusajs/ui"

const Command = ({ children, code }: { children: any; code: string }) => {
  return (
    <Primitive>
      {children}
      <code>{code}</code>
      <Primitive.Copy content="code" />
    </Primitive>
  )
}
export { Command }

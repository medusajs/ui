"use client"

import { CodeBlock as Primitive } from "@medusajs/ui"

const CodeBlock = ({ snippets }: { snippets: any[] }) => {
  return (
    <Primitive snippets={snippets}>
      <Primitive.Body hideLineNumbers className="pb-4" />
    </Primitive>
  )
}

export { CodeBlock }

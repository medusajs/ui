"use client"

import { CodeBlock as Primitive } from "@medusajs/ui"

const CodeBlock = ({ code }: { code: string }) => {
  return (
    <Primitive snippets={[{ language: "tsx", label: "TSX", code }]}>
      <Primitive.Body hideLineNumbers className="pb-4" />
    </Primitive>
  )
}

export { CodeBlock }

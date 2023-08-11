"use client"

import { useMDXComponent } from "next-contentlayer/hooks"
import * as React from "react"

import { CodeBlock } from "@/components/code-block"
import { Command } from "@/components/command"
import { ComponentExample } from "@/components/component-example"
import { Snippet } from "@/components/snippet"
import { Text, clx } from "@medusajs/ui"

interface MdxProps {
  code: string
}

const components = {
  h1: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => {
    return (
      <h1 className={clx("h1-docs text-ui-fg-base", className)} {...props} />
    )
  },
  h2: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => {
    return <h2 className={clx("h2-docs my-6", className)} {...props} />
  },
  h3: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => {
    return <h3 className={clx("h3-docs my-4", className)} {...props} />
  },
  p: ({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => {
    return <Text className={clx("text-ui-fg-subtle", className)} {...props} />
  },
  CodeBlock,
  Command,
  ComponentExample,
  Snippet,
}

const Mdx = ({ code }: MdxProps) => {
  const Component = useMDXComponent(code)

  return (
    <div>
      <Component components={components} />
    </div>
  )
}

export { Mdx }

"use client"

import { useMDXComponent } from "next-contentlayer/hooks"
import * as React from "react"

import { ComponentExample } from "@/components/component-example"
import { Command } from "@/components/command"
import { CodeBlock } from "@/components/code-block"
import { Snippet } from "@/components/snippet"
import { Heading, Text, clx } from "@medusajs/ui"

interface MdxProps {
  code: string
}

const components = {
  h1: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => {
    return <h1 className={clx("h1-docs", className)} {...props} />
  },
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => {
    return <Heading level={"h2"} {...props} />
  },
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => {
    return <Heading level={"h3"} {...props} />
  },
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => {
    return <Text {...props} />
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

"use client"

import { useMDXComponent } from "next-contentlayer/hooks"
import * as React from "react"

import { Heading, Text } from "@medusajs/ui"
import { ComponentExample } from "@/components/component-example"
import { Command } from "@/components/command"
import { CodeBlock } from "@/components/code-block"
import { Snippet } from "@/components/snippet"

interface MdxProps {
  code: string
}

const components = {
  h1: (props: React.HTMLAttributes<HTMLHeadingElement>) => {
    return <Heading level={"h1"} {...props} />
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

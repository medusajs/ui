"use client"

import * as React from "react"
import { Registry } from "../registry"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/tabs"
import { Spinner } from "@medusajs/icons"
import { CodeBlock } from "./code-block"

interface ComponentExampleProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string
}

export function ComponentExample({
  children,
  name,
  ...props
}: ComponentExampleProps) {
  const Preview = React.useMemo(() => {
    const Component = Registry[name]?.component

    if (!Component) {
      return <p>Component {name} not found in registry</p>
    }

    return <Component />
  }, [name])

  const CodeElement = children as React.ReactElement
  const Code = CodeElement.props.code

  return (
    <div className="relative my-8 flex flex-col space-y-2" {...props}>
      <Tabs defaultValue="preview" className="relative mr-auto w-full">
        <div className="flex flex-col items-center justify-between pb-3">
          <TabsList className="">
            <TabsTrigger value="preview">Preview</TabsTrigger>
            <TabsTrigger value="code">Code</TabsTrigger>
          </TabsList>
          <TabsContent
            value="preview"
            className="border-ui-border-base bg-ui-bg-base relative flex items-center justify-center data-[state=active]:min-h-[400px] data-[state=active]:border"
          >
            <div className="flex w-full items-center justify-center px-10 py-5">
              <React.Suspense
                fallback={
                  <div className="text-ui-fg-muted flex items-center text-sm">
                    <Spinner className="animate-spin" />
                  </div>
                }
              >
                {Preview}
              </React.Suspense>
            </div>
          </TabsContent>
          <TabsContent value="code" className="relative">
            <CodeBlock code={Code} />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  )
}

"use client"

import { Spinner } from "@medusajs/icons"
import * as React from "react"
import { ExampleRegistry } from "../registries/example-registry"

import { CodeBlock } from "@/components/code-block"
import { Tabs } from "@medusajs/ui"

interface ComponentExampleProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string
}

export function ComponentExample({
  children,
  name,
  ...props
}: ComponentExampleProps) {
  const Preview = React.useMemo(() => {
    const Component = ExampleRegistry[name]?.component

    if (!Component) {
      return <p>Component {name} not found in registry</p>
    }

    return <Component />
  }, [name])

  const CodeElement = children as React.ReactElement
  const Code = CodeElement.props.code

  return (
    <div className="relative my-4 flex flex-col space-y-2" {...props}>
      <Tabs defaultValue="preview" className="relative mr-auto w-full">
        <div className="flex flex-col items-center justify-between pb-3">
          <Tabs.List className="w-full">
            <Tabs.Trigger value="preview">Preview</Tabs.Trigger>
            <Tabs.Trigger value="code">Code</Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content
            value="preview"
            className="relative w-full data-[state=active]:mt-4"
          >
            <div className="bg-ui-bg-base border-ui-border-base flex max-h-[400px] min-h-[400px] w-full items-center justify-center overflow-auto rounded-md border px-10 py-5">
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
          </Tabs.Content>
          <Tabs.Content
            value="code"
            className="relative w-full data-[state=active]:mt-4"
          >
            <CodeBlock code={Code} />
          </Tabs.Content>
        </div>
      </Tabs>
    </div>
  )
}

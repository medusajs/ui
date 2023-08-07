import React, { createContext, useContext, useState } from "react"
import { Highlight, themes } from "prism-react-renderer"
import copy from "copy-to-clipboard"
import { CheckCircleSolid, SquareTwoStack } from "@medusajs/icons"
import { Tooltip } from "@/components/tooltip"
import { clx } from "@/utils/clx"

export type CodeSnippet = {
  label: string
  language: string
  code: string
}

type CodeBlockState = {
  snippets: CodeSnippet[]
  active: CodeSnippet
  setActive: (active: CodeSnippet) => void
} | null

const CodeBlockContext = createContext<CodeBlockState>(null)

const useCodeBlockContext = () => {
  const context = useContext(CodeBlockContext)

  if (context === null)
    throw new Error(
      "useCodeBlockContext can only be used within a CodeBlockContext"
    )

  return context
}

type RootProps = {
  snippets: CodeSnippet[]
}

const Root = ({
  snippets,
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & RootProps) => {
  const [active, setActive] = useState(snippets[0])

  return (
    <CodeBlockContext.Provider value={{ snippets, active, setActive }}>
      <div
        className={clx(
          "border-ui-code-border-base min-w-[512px] overflow-hidden rounded-lg border",
          className
        )}
        {...props}
      >
        {children}
      </div>
    </CodeBlockContext.Provider>
  )
}

const HeaderComponent = ({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  const { snippets, active, setActive } = useCodeBlockContext()
  return (
    <div
      className={clx(
        "border-b-ui-code-border-base bg-ui-code-bg-header flex items-center gap-2 border-b px-4 py-3",
        className
      )}
      {...props}
    >
      {snippets.map((snippet) => (
        <div
          className={clx(
            "text-ui-code-text-subtle cursor-pointer rounded-full border border-transparent px-3 py-2 text-sm font-medium",
            {
              "text-ui-code-text-base border-ui-code-border-base bg-ui-code-bg-base cursor-default":
                active.label === snippet.label,
            }
          )}
          key={snippet.label}
          onClick={() => setActive(snippet)}
        >
          {snippet.label}
        </div>
      ))}
      {children}
    </div>
  )
}

const Meta = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={clx("text-ui-code-text-subtle ml-auto", className)}
      {...props}
    />
  )
}

const Header = Object.assign(HeaderComponent, { Meta })

type BodyProps = {
  hideLineNumbers?: boolean
}

const Body = ({
  className,
  hideLineNumbers = false,
}: React.HTMLAttributes<HTMLDivElement> & BodyProps) => {
  const { active } = useCodeBlockContext()
  return (
    <div className={clx("bg-ui-code-bg-base relative p-4 pb-6", className)}>
      <Copy content={active.code} className="absolute right-4 top-4" />
      <div className="max-w-[90%]">
        <Highlight
          theme={{
            ...themes.palenight,
            plain: {
              color: "rgba(249, 250, 251, 1)",
              backgroundColor: "#111827",
            },
          }}
          code={active.code}
          language={active.language}
        >
          {({ style, tokens, getLineProps, getTokenProps }) => (
            <pre
              className="bg-transparent font-mono text-sm"
              style={{
                ...style,
                background: "transparent",
              }}
            >
              {tokens.map((line, i) => (
                <div key={i} {...getLineProps({ line })} className="flex gap-4">
                  {!hideLineNumbers && (
                    <span className="text-ui-code-text-subtle">{i + 1}</span>
                  )}
                  {line.map((token, key) => (
                    <span key={key} {...getTokenProps({ token })} />
                  ))}
                </div>
              ))}
            </pre>
          )}
        </Highlight>
      </div>
    </div>
  )
}

const Command = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={clx(
        "bg-ui-code-bg-header border-ui-code-border-base flex items-center rounded-lg border px-3 py-2",
        "[&>code]:text-ui-code-text-base [&>code]:mx-3 [&>code]:font-mono [&>code]:text-sm [&>code]:leading-6",
        className
      )}
      {...props}
    />
  )
}

const Copy = ({
  className,
  content,
}: React.HTMLAttributes<HTMLSpanElement> & { content: string }) => {
  const [done, setDone] = useState(false)

  const copyToClipboard = () => {
    setDone(true)
    copy(content)
    setTimeout(() => {
      setDone(false)
    }, 2500)
  }

  return (
    <Tooltip content={"Copy"} onClick={(e) => e.preventDefault()}>
      <span
        className={clx("text-ui-code-icon ml-auto cursor-pointer", className)}
        onClick={copyToClipboard}
      >
        {done ? <CheckCircleSolid /> : <SquareTwoStack />}
      </span>
    </Tooltip>
  )
}

const CodeBlock = Object.assign(Root, { Body, Header, Meta })

export { Command, Copy, CodeBlock }

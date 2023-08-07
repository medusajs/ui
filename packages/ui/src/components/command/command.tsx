import { clx } from "@/utils/clx"
import { Copy } from "@/components/copy"
import React from "react"

const CommandComponent = ({
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

const Command = Object.assign(CommandComponent, { Copy })

export { Command }

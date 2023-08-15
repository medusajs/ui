"use client"

import { Tooltip } from "@/components/tooltip"
import { clx } from "@/utils/clx"
import { CheckCircleSolid, SquareTwoStack } from "@medusajs/icons"
import copy from "copy-to-clipboard"
import React, { useState } from "react"

type CopyProps = {
  content: string
}

const Copy = React.forwardRef<
  HTMLButtonElement,
  React.HTMLAttributes<HTMLButtonElement> & CopyProps
>(({ children, className, content, ...props }, ref) => {
  const [done, setDone] = useState(false)

  const copyToClipboard = () => {
    setDone(true)
    copy(content)
    setTimeout(() => {
      setDone(false)
    }, 2500)
  }

  return (
    <Tooltip content={"Copy"}>
      <button
        ref={ref}
        aria-label="Copy code snippet"
        type="button"
        className={clx("text-ui-code-icon", className)}
        onClick={copyToClipboard}
        {...props}
      >
        {children ? children : done ? <CheckCircleSolid /> : <SquareTwoStack />}
      </button>
    </Tooltip>
  )
})
Copy.displayName = "Copy"

export { Copy }

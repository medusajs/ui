import React, { useState } from "react"
import copy from "copy-to-clipboard"
import { CheckCircleSolid, SquareTwoStack } from "@medusajs/icons"
import { Tooltip } from "@/components/tooltip"
import { clx } from "@/utils/clx"

type CopyProps = {
  content: string
}

const Copy = React.forwardRef<
  HTMLButtonElement,
  React.HTMLAttributes<HTMLButtonElement> & CopyProps
>(({ className, content, ...props }, ref) => {
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
        {done ? <CheckCircleSolid /> : <SquareTwoStack />}
      </button>
    </Tooltip>
  )
})

export { Copy }

import * as React from "react"
import type { IconProps } from "../types"
const De = React.forwardRef<SVGSVGElement, Omit<IconProps, "color">>(
  (props, ref) => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={20}
        height={20}
        fill="none"
        ref={ref}
        {...props}
      >
        <path
          fill="#FFCE00"
          d="M4 11.5h12v2a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-2Z"
        />
        <path fill="#000" d="M4 6.5a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v2H4v-2Z" />
        <path fill="#D00" d="M4 8.5h12v3H4v-3Z" />
      </svg>
    )
  }
)
De.displayName = "De"
export default De

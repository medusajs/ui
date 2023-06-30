import * as React from "react"
import type { IconProps } from "../types"
const No = React.forwardRef<SVGSVGElement, Omit<IconProps, "color">>(
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
          fill="#ED2939"
          d="M4 6.5a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-7Z"
        />
        <path fill="#fff" d="M7.375 5.5h2.25v9h-2.25v-9Z" />
        <path fill="#fff" d="M4 8.875h12v2.25H4v-2.25Z" />
        <path fill="#002664" d="M7.938 5.5h1.125v9H7.938v-9Z" />
        <path fill="#002664" d="M4 9.438h12v1.124H4V9.438Z" />
      </svg>
    )
  }
)
No.displayName = "No"
export default No

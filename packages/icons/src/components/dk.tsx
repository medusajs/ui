import * as React from "react"
import type { IconProps } from "../types"
const Dk = React.forwardRef<SVGSVGElement, Omit<IconProps, "color">>(
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
          fill="#C8102E"
          d="M3.999 6.5a1 1 0 0 1 1-1h10.002a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H4.999a1 1 0 0 1-1-1v-7Z"
        />
        <path fill="#fff" d="M7.856 5.5h1.287v9H7.856v-9Z" />
        <path fill="#fff" d="M3.999 9.357h12.002v1.287H3.999V9.357Z" />
      </svg>
    )
  }
)
Dk.displayName = "Dk"
export default Dk

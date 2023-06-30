import * as React from "react"
import type { IconProps } from "../types"
const At = React.forwardRef<SVGSVGElement, Omit<IconProps, "color">>(
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
        <g fillRule="evenodd" clipPath="url(#a)" clipRule="evenodd">
          <path fill="#fff" d="M16 14.5H4v-9h12v9Z" />
          <path fill="#ED2939" d="M16 14.5H4v-3h12v3Zm0-5.998H4v-3h12v3Z" />
        </g>
        <defs>
          <clipPath id="a">
            <rect width={12} height={9} x={4} y={5.5} fill="#fff" rx={1} />
          </clipPath>
        </defs>
      </svg>
    )
  }
)
At.displayName = "At"
export default At

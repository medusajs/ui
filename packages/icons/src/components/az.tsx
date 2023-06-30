import * as React from "react"
import type { IconProps } from "../types"
const Az = React.forwardRef<SVGSVGElement, Omit<IconProps, "color">>(
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
        <g clipPath="url(#a)">
          <path fill="#3F9C35" d="M4.002 5.5h12v9h-12v-9Z" />
          <path fill="#ED2939" d="M4.002 5.5h12v6h-12v-6Z" />
          <path fill="#00B9E4" d="M4.002 5.5h12v3h-12v-3Z" />
          <path
            fill="#fff"
            d="M9.7 11.35a1.35 1.35 0 1 0 0-2.7 1.35 1.35 0 0 0 0 2.7Z"
          />
          <path
            fill="#ED2939"
            d="M10 11.125a1.125 1.125 0 1 0 0-2.25 1.125 1.125 0 0 0 0 2.25Z"
          />
          <path
            fill="#fff"
            d="m11.2 9.25.144.403.387-.184-.184.389.403.142-.403.144.184.387-.387-.184-.144.403-.144-.403-.387.184.184-.387L10.45 10l.403-.144-.184-.387.387.184.144-.403Z"
          />
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
Az.displayName = "Az"
export default Az

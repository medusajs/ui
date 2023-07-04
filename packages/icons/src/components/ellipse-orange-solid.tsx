import * as React from "react"
import type { IconProps } from "../types"
const EllipseOrangeSolid = React.forwardRef<SVGSVGElement, IconProps>(
  ({ color = "currentColor", ...props }, ref) => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={20}
        height={20}
        fill="none"
        ref={ref}
        {...props}
      >
        <g clipPath="url(#a)" filter="url(#b)">
          <rect width={10} height={10} x={5} y={5} fill="#fff" rx={5} />
          <circle cx={10} cy={10} r={3} fill="#FFB224" />
        </g>
        <defs>
          <clipPath id="a">
            <path fill="#fff" d="M0 0h20v20H0z" />
          </clipPath>
          <filter
            id="b"
            width={18}
            height={18}
            x={1}
            y={3}
            colorInterpolationFilters="sRGB"
            filterUnits="userSpaceOnUse"
          >
            <feFlood floodOpacity={0} result="BackgroundImageFix" />
            <feColorMatrix
              in="SourceAlpha"
              result="hardAlpha"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            />
            <feOffset dy={2} />
            <feGaussianBlur stdDeviation={2} />
            <feComposite in2="hardAlpha" operator="out" />
            <feColorMatrix values="0 0 0 0 0.0666667 0 0 0 0 0.0941176 0 0 0 0 0.109804 0 0 0 0.04 0" />
            <feBlend
              in2="BackgroundImageFix"
              result="effect1_dropShadow_2733_2027"
            />
            <feColorMatrix
              in="SourceAlpha"
              result="hardAlpha"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            />
            <feMorphology
              in="SourceAlpha"
              radius={1}
              result="effect2_dropShadow_2733_2027"
            />
            <feOffset dy={1} />
            <feGaussianBlur stdDeviation={1} />
            <feComposite in2="hardAlpha" operator="out" />
            <feColorMatrix values="0 0 0 0 0.0666667 0 0 0 0 0.0941176 0 0 0 0 0.109804 0 0 0 0.08 0" />
            <feBlend
              in2="effect1_dropShadow_2733_2027"
              result="effect2_dropShadow_2733_2027"
            />
            <feColorMatrix
              in="SourceAlpha"
              result="hardAlpha"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            />
            <feMorphology
              in="SourceAlpha"
              operator="dilate"
              radius={1}
              result="effect3_dropShadow_2733_2027"
            />
            <feOffset />
            <feComposite in2="hardAlpha" operator="out" />
            <feColorMatrix values="0 0 0 0 0.0666667 0 0 0 0 0.0941176 0 0 0 0 0.109804 0 0 0 0.08 0" />
            <feBlend
              in2="effect2_dropShadow_2733_2027"
              result="effect3_dropShadow_2733_2027"
            />
            <feBlend
              in="SourceGraphic"
              in2="effect3_dropShadow_2733_2027"
              result="shape"
            />
          </filter>
        </defs>
      </svg>
    )
  }
)
EllipseOrangeSolid.displayName = "EllipseOrangeSolid"
export default EllipseOrangeSolid

import * as React from "react"
import type { IconProps } from "../types"
const Ca = React.forwardRef<SVGSVGElement, Omit<IconProps, "color">>(
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
          <path fill="#fff" d="M6.815 5.5h6.369v9h-6.37v-9Z" />
          <path
            fill="#D52B1E"
            d="M3.632 5.5h3.183v9H3.632v-9Zm9.551 0h3.184v9h-3.182l-.002-9ZM7.77 9.849l-.25.084 1.152 1.01c.088.26-.03.335-.105.472l1.248-.158-.03 1.257.26-.007-.058-1.248 1.252.149c-.078-.163-.146-.25-.076-.51l1.15-.958-.2-.074c-.166-.126.07-.61.105-.915 0 0-.67.23-.714.109l-.172-.33-.61.672c-.067.016-.095-.01-.11-.066l.28-1.403-.446.251c-.037.018-.074.004-.099-.04l-.43-.862-.443.895c-.034.032-.067.035-.095.014l-.426-.239.257 1.39c-.021.057-.07.07-.126.041l-.586-.663c-.075.123-.126.322-.228.368-.1.042-.44-.085-.667-.134.078.28.32.744.167.897v-.002Z"
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
Ca.displayName = "Ca"
export default Ca

import { HookRegistryItem } from "@/types/hooks"
import * as React from "react"

export const HookRegistry: Record<string, HookRegistryItem> = {
  useSelectContext: {
    table: React.lazy(() => import("../props/hooks/useSelectContext")),
  },
}

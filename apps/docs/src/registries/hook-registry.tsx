import { HookRegistryItem } from "@/types/hooks"
import * as React from "react"

export const HookRegistry: Record<string, HookRegistryItem> = {
  useToast: {
    table: React.lazy(() => import("../props/hooks/useToast")),
  },
  ToasterToast: {
    table: React.lazy(() => import("../props/hooks/ToasterToast")),
  },
  usePrompt: {
    table: React.lazy(() => import("../props/hooks/usePrompt")),
  },
  PromptProps: {
    table: React.lazy(() => import("../props/hooks/PromptProps")),
  },
  useToggleState: {
    table: React.lazy(() => import("../props/hooks/useToggleState")),
  },
}

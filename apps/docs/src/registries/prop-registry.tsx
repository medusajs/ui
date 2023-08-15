import * as React from "react"
import { PropRegistryItem } from "../types/props"

export const PropRegistry: Record<string, PropRegistryItem> = {
  avatar: {
    table: React.lazy(() => import("../props/avatar")),
  },
  badge: {
    table: React.lazy(() => import("../props/badge")),
  },
  button: {
    table: React.lazy(() => import("../props/button")),
  },
  calendar: {
    table: React.lazy(() => import("../props/calendar")),
  },
  "date-picker": {
    table: React.lazy(() => import("../props/date-picker")),
  },
  heading: {
    table: React.lazy(() => import("../props/heading")),
  },
  hint: {
    table: React.lazy(() => import("../props/hint")),
  },
  input: {
    table: React.lazy(() => import("../props/input")),
  },
  label: {
    table: React.lazy(() => import("../props/label")),
  },
  switch: {
    table: React.lazy(() => import("../props/switch")),
  },
  text: {
    table: React.lazy(() => import("../props/text")),
  },
  "time-input": {
    table: React.lazy(() => import("../props/time-input")),
  },
  tooltip: {
    table: React.lazy(() => import("../props/tooltip")),
  },
}

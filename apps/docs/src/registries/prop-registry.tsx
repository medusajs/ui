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
  "code-block": {
    table: React.lazy(() => import("../props/code-block")),
  },
  "code-block-header": {
    table: React.lazy(() => import("../props/code-block-header")),
  },
  "code-block-body": {
    table: React.lazy(() => import("../props/code-block-body")),
  },
  copy: {
    table: React.lazy(() => import("../props/copy")),
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
  select: {
    table: React.lazy(() => import("../props/select")),
  },
  "select-value": {
    table: React.lazy(() => import("../props/select-value")),
  },
  "select-item": {
    table: React.lazy(() => import("../props/select-item")),
  },
  switch: {
    table: React.lazy(() => import("../props/switch")),
  },
  "table-pagination": {
    table: React.lazy(() => import("../props/table-pagination")),
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

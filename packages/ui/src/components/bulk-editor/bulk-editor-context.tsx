import * as React from "react"

import { BoundingBox, CellState, ColumnState, Point } from "./types"

type BulkEditorContextValue = {
  onInitiateDragFill: (event: React.MouseEvent) => void
  getCellState: (point: Point | null) => CellState
  registerCell: (point: Point) => void
  unregisterCell: (point: Point) => void
  registerColumn: (state: ColumnState) => void
  anchor: Point | null
  columnState: Record<string, ColumnState>
  boundingBoxes: BoundingBox[]
  fillBoundingBoxes: BoundingBox[]
}

const BulkEditorContext = React.createContext<BulkEditorContextValue | null>(
  null
)

const useBulkEditorContext = () => {
  const context = React.useContext(BulkEditorContext)

  if (!context) {
    throw new Error("useBulkEditorContext should be used within a BulkEditor")
  }

  return context
}

export { BulkEditorContext, useBulkEditorContext }

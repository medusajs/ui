/**
 * Represents the column and row of a cell.
 */
export type Point = {
  col: number
  row: number
}

/**
 * Represents a range of cells.
 */
export type BoundingBox = {
  topLeft: Point | null
  bottomRight: Point | null
}

/**
 * Attributes for a points border.
 */
export type BorderAttributes = {
  top: boolean
  left: boolean
  bottom: boolean
  right: boolean
}

export type ColumnState = {
  colIndex: number
  name: string
  isVisible: boolean
  canHide: boolean
}

/**
 * The state of a cell.
 */
export type CellState = {
  isSelected: boolean
  isAnchor: boolean
}

/**
 * A HTML table cell with a reference to its parent row.
 */
export type CellWithParentRow = HTMLTableCellElement & {
  parentElement: HTMLTableRowElement
}

/**
 * A command that can be executed, undone and redone.
 */
export interface Command {
  execute(): void
  undo(): void
  redo(): void
}

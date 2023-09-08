import { EDITABLE_ATTRIBUTE, POINT_ATTRIBUTE } from "./constants"
import {
  BorderAttributes,
  BoundingBox,
  CellWithParentRow,
  Point,
} from "./types"

/**
 * Checks if the parent of an element is a table row.
 * @param element - The element to check
 * @returns `true` if the parent of the element is a table row, `false` otherwise
 */
export const parentIsRow = (
  element: HTMLElement | null
): element is CellWithParentRow => {
  if (!element) {
    return false
  }

  const parent = element.parentElement

  return !!parent && parent.nodeName === "TR"
}

/**
 * Validates that the target of an interaction is a valid cell.
 * @param target - The target element to validate
 * @returns - The validated target element or `null` if the target is invalid
 */
export const validateTarget = (
  target: HTMLElement | null
): CellWithParentRow | null => {
  if (!target) {
    return null
  }

  const cell = target.closest("td")

  if (!cell) {
    return null
  }

  const isEditable = cell.getAttribute(EDITABLE_ATTRIBUTE) === "true"

  if (!isEditable) {
    return null
  }

  const isNestedInRow = parentIsRow(cell)

  if (!isNestedInRow) {
    return null
  }

  return cell
}

export const validateMouseOverTarget = (
  target: HTMLElement | null,
  col: number
): CellWithParentRow | null => {
  if (!target) {
    return null
  }

  const cell = target.closest("td")

  if (!cell) {
    return null
  }

  let targetCell: HTMLTableCellElement | null = cell

  const isEditable =
    targetCell.getAttribute(EDITABLE_ATTRIBUTE) === "true" &&
    targetCell.cellIndex === col

  if (!isEditable) {
    /**
     * If the target cell is not editable, we attempt to find the nearest
     * editable cell. This allows the user to drag over non-editable cells
     * such as the row labels, and still select the cells they want.
     */
    targetCell = findNearestEditableCell(targetCell, col)
  }

  if (!targetCell) {
    return null
  }

  const isNestedInRow = parentIsRow(targetCell)

  if (!isNestedInRow) {
    return null
  }

  return targetCell as CellWithParentRow
}

/**
 * Attempts to find the nearest editable cell to a given cell.
 * @param cell - The cell to find the nearest editable cell for
 * @returns The nearest editable cell or `null` if no cell is found
 */
export const findNearestEditableCell = (
  cell: HTMLTableCellElement,
  col: number
) => {
  const nextCell = cell.nextElementSibling as HTMLTableCellElement
  const isNextCellEditable =
    nextCell?.getAttribute(EDITABLE_ATTRIBUTE) === "true" &&
    nextCell.cellIndex === col

  if (isNextCellEditable) {
    return nextCell
  }

  const previousCell = cell.previousElementSibling as HTMLTableCellElement
  const isPreviousCellEditable =
    previousCell?.getAttribute(EDITABLE_ATTRIBUTE) === "true" &&
    previousCell.cellIndex === col

  if (isPreviousCellEditable) {
    return previousCell
  }

  return null
}

/**
 * Creates a key value for a point.
 * @param point - The point to get the key for
 * @returns The key for the point
 */
export const getKey = (point: Point) => {
  return `${point.col}-${point.row}`
}

/**
 * Gets the point for a cell.
 * @param cell - The cell to get the point for
 * @returns The point for the cell
 */
export const getPoint = (cell: CellWithParentRow): Point => {
  return {
    col: cell.cellIndex,
    row: cell.parentElement.rowIndex,
  }
}

/**
 * Extracts a Point from a key.
 * @param key - The key to get the point for
 * @returns The point for the key or `null` if the key is invalid
 */
export const getPointFromKey = (key: string): Point | null => {
  const [col, row] = key.split("-")

  if (!col || !row) {
    return null
  }

  return {
    col: parseInt(col, 10),
    row: parseInt(row, 10),
  }
}

/**
 * Finds the first editable cell in a root element.
 * @param root - The root element to search in
 * @returns The first editable cell in the root element or `null` if no cell is found
 */
export const findFirstCell = (root?: HTMLElement): Point | null => {
  const parent = root || document

  const firstCell = parent.querySelector(
    `td[${EDITABLE_ATTRIBUTE}='true']`
  ) as HTMLTableCellElement | null

  if (!firstCell) {
    return null
  }

  const isInRow = parentIsRow(firstCell)

  if (!isInRow) {
    return null
  }

  return getPoint(firstCell)
}

/**
 * Finds the cell for a point in a root element.
 * @param point - The point to find the cell for
 * @param root - The root element to search in
 * @returns The cell for the point or `null` if no cell is found
 */
export const findCellByPoint = (
  point: Point,
  root?: HTMLElement
): CellWithParentRow | null => {
  const parent = root || document

  const cell = parent.querySelector(
    `td[${POINT_ATTRIBUTE}='${getKey(point)}']`
  ) as HTMLTableCellElement | null

  if (!cell) {
    return null
  }

  const isInRow = parentIsRow(cell)

  if (!isInRow) {
    return null
  }

  return cell
}

/**
 * Gets the child inputs for a set of cell keys.
 * @param keys - The keys to find the inputs for
 * @param root - The optional root element to search in, defaults to `document`
 * @returns A NodeList of inputs for the keys in the root element or `undefined` if no inputs are found
 */
export const getInputs = (
  keys: string[],
  root?: HTMLElement | null
): NodeListOf<HTMLInputElement> => {
  const parent = root || document

  const query = keys
    .map((key) => `td[${POINT_ATTRIBUTE}='${key}'] input`)
    .join(", ")

  const inputs = parent.querySelectorAll(query) as NodeListOf<HTMLInputElement>

  return inputs
}

/**
 * Gets the values of a set of inputs.
 * @param inputs - The inputs to get the values for
 * @returns An array of input values, if no inputs are provided, an empty array is returned
 */
export const getInputValues = (inputs?: NodeListOf<HTMLInputElement>) => {
  if (!inputs) {
    return ""
  }

  const values = Array.from(inputs)
    .map((input) => input.value)
    .join(";")

  return values
}

export const setInputValues = (
  data: string,
  inputs?: NodeListOf<HTMLInputElement>
) => {
  if (!inputs) {
    return
  }

  const values = data.split(";")

  if (values.length === 0) {
    return
  }

  const valuesToSet: string[] = []

  for (let i = 0; i < inputs.length; i++) {
    const valueIndex = i % values.length
    valuesToSet.push(values[valueIndex])
  }

  inputs.forEach((input, index) => {
    input.value = valuesToSet[index]
  })
}

/**
 * Checks if a point is inside a bounding box.
 * @param point - The point to check
 * @param boundingBox - The bounding box to check
 * @returns Whether the point is inside the bounding box
 */
const isPointInsideBoundingBox = (
  point: Point,
  boundingBox: BoundingBox
): boolean => {
  const { topLeft, bottomRight } = boundingBox
  if (!topLeft || !bottomRight) {
    return false
  }
  return (
    point.col >= topLeft.col &&
    point.col <= bottomRight.col &&
    point.row >= topLeft.row &&
    point.row <= bottomRight.row
  )
}

/**
 * Gets the border attributes for a point.
 * @param point - The point to get the border attributes for
 * @param boundingBoxes - The bounding boxes to check
 * @returns A map of border attributes for the point
 */
export const getBorderAttributes = (
  point: Point | null,
  boundingBoxes: BoundingBox[]
): BorderAttributes => {
  const borders = {
    top: false,
    left: false,
    bottom: false,
    right: false,
  }

  if (!point) {
    return borders
  }

  for (const boundingBox of boundingBoxes) {
    if (isPointInsideBoundingBox(point, boundingBox)) {
      if (point.row === boundingBox.topLeft?.row) {
        borders.top = true
      }
      if (point.col === boundingBox.topLeft?.col) {
        borders.left = true
      }
      if (point.row === boundingBox.bottomRight?.row) {
        borders.bottom = true
      }
      if (point.col === boundingBox.bottomRight?.col) {
        borders.right = true
      }
    }
  }

  return borders
}

/**
 * Checks if a Point is the bottom right cell of the bounding box containing the anchor cell.
 * @param point - The point to check
 * @param anchor - The anchor point to check
 * @param boundingBoxes - The bounding boxes to check
 * @returns Whether the fill handle should be rendered in the given point
 */
export const shouldRenderFillHandle = (
  point: Point | null,
  anchor: Point | null,
  boundingBoxes: BoundingBox[]
) => {
  if (!point || !anchor) {
    return false
  }

  // Find the bounding box containing the anchor
  const anchorBoundingBox = boundingBoxes.find((box) =>
    isPointInsideBoundingBox(anchor, box)
  )

  // Check if the current cell is the bottom right cell of the anchor's bounding box
  if (anchorBoundingBox) {
    const isBottomRightCell =
      point.col === anchorBoundingBox.bottomRight?.col &&
      point.row === anchorBoundingBox.bottomRight?.row
    return isBottomRightCell
  }

  return false
}

/**
 * Gets the range of cells between two points.
 * @param start - The start point
 * @param end - The end point
 * @returns A map of cell keys for the range
 */
export const getRange = (start: Point, end: Point): Record<string, boolean> => {
  const range: Record<string, boolean> = {}

  const minX = Math.min(start.col, end.col)
  const maxX = Math.max(start.col, end.col)

  const minY = Math.min(start.row, end.row)
  const maxY = Math.max(start.row, end.row)

  for (let x = minX; x <= maxX; x++) {
    for (let y = minY; y <= maxY; y++) {
      range[`${x}-${y}`] = true
    }
  }

  return range
}

export const calculateBoundingBoxes = (points: Point[]): BoundingBox[] => {
  const grid = new Map<number, Set<number>>()
  for (const { col, row } of points) {
    if (!grid.has(col)) {
      grid.set(col, new Set<number>())
    }

    grid.get(col)!.add(row)
  }

  const visited = new Set<string>()
  const components: Point[][] = []

  const dfs = (col: number, row: number, component: Point[]) => {
    if (
      !grid.has(col) ||
      !grid.get(col)!.has(row) ||
      visited.has(`${col}-${row}`)
    ) {
      return
    }

    visited.add(`${col}-${row}`)
    component.push({ col, row })

    const neighbours: Point[] = [
      { col: col - 1, row },
      { col: col + 1, row },
      { col, row: row - 1 },
      { col, row: row + 1 },
    ]

    for (const { col, row } of neighbours) {
      dfs(col, row, component)
    }
  }

  for (const { col, row } of points) {
    if (!visited.has(`${col}-${row}`)) {
      const component: Point[] = []
      dfs(col, row, component)
      components.push(component)
    }
  }

  const boundingBoxes: BoundingBox[] = components.map((component) => {
    const minX = Math.min(...component.map((point) => point.col))
    const maxX = Math.max(...component.map((point) => point.col))

    const minY = Math.min(...component.map((point) => point.row))
    const maxY = Math.max(...component.map((point) => point.row))

    const topLeft: Point = {
      col: minX,
      row: minY,
    }

    const bottomRight: Point = {
      col: maxX,
      row: maxY,
    }

    return {
      topLeft,
      bottomRight,
    }
  })

  return boundingBoxes
}

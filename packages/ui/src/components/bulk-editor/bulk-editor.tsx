import { Adjustments } from "@medusajs/icons"
import * as React from "react"

import { Button } from "@/components/button"
import { DropdownMenu } from "@/components/dropdown-menu"
import { clx } from "@/utils/clx"

class SortedSet<T> {
  private items: T[] = []

  constructor(initialItems?: T[]) {
    if (initialItems) {
      this.insertMultiple(initialItems)
    }
  }

  private findInsertionIndex(value: T): number {
    let left = 0
    let right = this.items.length - 1
    while (left <= right) {
      const mid = Math.floor((left + right) / 2)
      if (this.items[mid] === value) {
        return mid
      } else if (this.items[mid] < value) {
        left = mid + 1
      } else {
        right = mid - 1
      }
    }
    return left
  }

  insert(value: T): void {
    const insertionIndex = this.findInsertionIndex(value)

    if (this.items[insertionIndex] !== value) {
      this.items.splice(insertionIndex, 0, value)
    }
  }

  getPrev(value: T): T | null {
    const index = this.findInsertionIndex(value)
    if (index === 0) {
      return null
    }

    return this.items[index - 1]
  }

  getNext(value: T): T | null {
    const index = this.findInsertionIndex(value)
    if (index === this.items.length - 1) {
      return null
    }

    return this.items[index + 1]
  }

  getFirst(): T | null {
    if (this.items.length === 0) {
      return null
    }

    return this.items[0]
  }

  getLast(): T | null {
    if (this.items.length === 0) {
      return null
    }

    return this.items[this.items.length - 1]
  }

  insertMultiple(values: T[]): void {
    values.forEach((value) => this.insert(value))
  }

  toArray(): T[] {
    return [...this.items]
  }
}

type Point = {
  col: number
  row: number
}

type CellState = {
  isSelected: boolean
  isAnchor: boolean
  isRangeEnd: boolean
  isEdited: boolean
}

type BulkEditorContextValue = {
  onFillDragStart: () => void
  getCellState: (point: Point | null) => CellState
  registerCell: (point: Point) => void
  unregisterCell: (point: Point) => void
  boundingBox: BoundingBox
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

enum Direction {
  Left = "left",
  Right = "right",
  Up = "up",
  Down = "down",
}

type CellWithRowParent = HTMLTableCellElement & {
  parentElement: HTMLTableRowElement
}

const parentIsRow = (
  element: HTMLElement | null
): element is CellWithRowParent => {
  if (!element) {
    return false
  }

  const parent = element.parentElement

  return !!parent && parent.nodeName === "TR"
}

type BoundingBox = {
  topLeft: Point | null
  bottomRight: Point | null
}

/**
 * TODO:
 * [] Reduce lag when rendering large sets of data
 *    - Use Column Defs to keep track of the number of columns. This should make it easier to calculate navigation.
 *    - (Maybe) Use a virtualized list
 */

const Root = ({ children }: React.PropsWithChildren) => {
  const [anchor, setAnchor] = React.useState<Point | null>(null)
  const [rangeEnd, setRangeEnd] = React.useState<Point | null>(null)

  const cols: SortedSet<number> = React.useMemo(() => new SortedSet(), [])
  const rows: SortedSet<number> = React.useMemo(() => new SortedSet(), [])

  const [cells, setCells] = React.useState<Record<string, boolean>>({})
  const [selected, setSelected] = React.useState<Record<string, boolean>>({})
  const [edited, setEdited] = React.useState<Record<string, number>>({})

  const [boundingBox, setBoundingBox] = React.useState<BoundingBox>({
    topLeft: null,
    bottomRight: null,
  })

  const [isDragFill, setIsDragFill] = React.useState(false)
  const [isDrag, setIsDrag] = React.useState(false)

  const ref = React.useRef<HTMLTableElement>(null)

  const clearSelection = React.useCallback(() => {
    setAnchor(null)
    setRangeEnd(null)
  }, [])

  const getKey = (point: Point) => {
    return `${point.col}-${point.row}`
  }

  const getCellState = React.useCallback(
    (point: Point | null): CellState => {
      if (!point) {
        return {
          isSelected: false,
          isAnchor: false,
          isRangeEnd: false,
          isEdited: false,
        }
      }

      const key = getKey(point)

      const state: CellState = {
        isSelected: !!selected[key],
        isAnchor: anchor
          ? anchor.row === point.row && anchor.col === point.col
          : false,
        isRangeEnd: rangeEnd
          ? rangeEnd.row === point.row && rangeEnd.col === point.col
          : false,
        isEdited: !!edited[key],
      }

      return state
    },
    [anchor, rangeEnd, selected, edited]
  )

  const getSelectedInputElements = React.useCallback(() => {
    const keys = Object.keys(selected)

    /**
     * Query to retrieve the input elements for each selected cell.
     */
    const query = keys.map((key) => `td[data-point='${key}'] input`).join(",")

    const inputs: NodeListOf<HTMLInputElement> | undefined =
      ref.current?.querySelectorAll(query)

    return inputs
  }, [selected])

  const getInputValues = (inputs?: NodeListOf<HTMLInputElement>) => {
    const values = Array.from(inputs ?? []).map((input) => input.value)

    return values
  }

  const setInputValues = (
    values: string[],
    targets?: NodeListOf<HTMLInputElement>
  ) => {
    if (!targets) {
      return
    }

    targets.forEach((target, index) => {
      target.value = values[index]
    })
  }

  const getChildValues = React.useCallback(() => {
    const keys = Object.keys(selected)

    /**
     * Query to retrieve the input elements for each selected cell.
     */
    const query = keys.map((key) => `td[data-point='${key}'] input`).join(",")

    const selectedCells: NodeListOf<HTMLInputElement> | undefined =
      ref.current?.querySelectorAll(query)

    /**
     * Get the values of each selected cell.
     */
    const values = Array.from(selectedCells ?? []).map((cell) => cell.value)

    return values
  }, [selected])

  const onFillDragStart = React.useCallback(() => {
    getChildValues()
  }, [getChildValues])

  const registerCell = React.useCallback(
    (point: Point) => {
      const key = getKey(point)

      cols.insert(point.col)
      rows.insert(point.row)

      setCells((cells) => ({
        ...cells,
        [key]: true,
      }))
    },
    [cols, rows]
  )

  const unregisterCell = React.useCallback((point: Point) => {
    const key = getKey(point)

    setCells((cells) => {
      const { [key]: _, ...rest } = cells

      return rest
    })
  }, [])

  React.useEffect(() => {
    if (anchor && rangeEnd) {
      const topLeft: Point = {
        col: Math.min(anchor.col, rangeEnd.col),
        row: Math.min(anchor.row, rangeEnd.row),
      }

      const bottomRight: Point = {
        col: Math.max(anchor.col, rangeEnd.col),
        row: Math.max(anchor.row, rangeEnd.row),
      }

      setBoundingBox({
        topLeft,
        bottomRight,
      })
    }
  }, [anchor, rangeEnd])

  React.useEffect(() => {
    const setRangeEndState = (cell: CellWithRowParent | null) => {
      if (!cell) {
        setRangeEnd(null)
        return
      }

      const point: Point = {
        col: cell.cellIndex,
        row: cell.parentElement.rowIndex,
      }

      setRangeEnd(point)
    }

    const setAnchorState = (cell: CellWithRowParent) => {
      const point: Point = {
        col: cell.cellIndex,
        row: cell.parentElement.rowIndex,
      }

      setAnchor(point)
    }

    const validateInteraction = (
      target: HTMLElement | null
    ): CellWithRowParent | null => {
      if (!target) {
        return null
      }

      const cell = target.closest("td")

      if (!cell) {
        return null
      }

      const isEditable = cell.getAttribute("data-editable") === "true"

      if (!isEditable) {
        return null
      }

      const isNestedInRow = parentIsRow(cell)

      if (!isNestedInRow) {
        return null
      }

      return cell
    }

    // Listen for mouse down on the document
    const onMouseDown = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null

      const cell = validateInteraction(target)

      if (!cell) {
        return
      }

      setIsDrag(true)

      /**
       * If the user is holding shift, we want to set the range end state
       */
      if (e.shiftKey) {
        setRangeEndState(cell)
        return
      }

      /**
       * If the user is holding cmd/ctrl, we want to add the cell to the
       * selected cells.
       */
      if (e.metaKey || e.ctrlKey) {
        console.log("Selecting cell")

        setRangeEndState(null)

        setSelected((selectedCells) => ({
          ...selectedCells,
          [getKey({
            col: cell.cellIndex,
            row: cell.parentElement.rowIndex,
          })]: true,
        }))

        return
      }

      /**
       * The default behaviour is to set the anchor and range end state to the
       * cell that was clicked.
       */
      clearSelection()

      setRangeEndState(cell)
      setAnchorState(cell)
    }

    const onMouseMove = (e: MouseEvent) => {
      if (!isDrag) {
        return
      }

      const target = e.target as HTMLElement | null

      const cell = validateInteraction(target)

      if (!cell) {
        return
      }

      setRangeEndState(cell)
    }

    // Listen for mouse up on the document
    const onMouseUp = (e: MouseEvent) => {
      setIsDrag(false)

      const target = e.target as HTMLElement | null

      const cell = validateInteraction(target)

      if (!cell) {
        return
      }

      setRangeEndState(cell)
    }

    document.addEventListener("mousedown", onMouseDown)
    document.addEventListener("mousemove", onMouseMove)
    document.addEventListener("mouseup", onMouseUp)

    return () => {
      document.removeEventListener("mousedown", onMouseDown)
      document.removeEventListener("mousemove", onMouseMove)
      document.removeEventListener("mouseup", onMouseUp)
    }
  }, [clearSelection, isDrag, cells])

  const findFirstEditableCell = React.useCallback(() => {
    const firstCell = document.querySelector(
      "td[data-editable='true']"
    ) as HTMLElement | null

    if (!firstCell) {
      return null
    }

    const isNestedInRow = parentIsRow(firstCell)

    if (!isNestedInRow) {
      return null
    }

    return {
      col: firstCell.cellIndex,
      row: firstCell.parentElement.rowIndex,
    }
  }, [])

  React.useEffect(() => {
    const moveAnchor = (
      curr: Point,
      rangeEnd: Point,
      direction: Direction,
      shift: boolean,
      cmd: boolean
    ) => {
      let nextPoint: Point | null = null

      if (!cmd) {
        if (direction === Direction.Left) {
          const next = cols.getPrev(shift ? rangeEnd.col : curr.col)

          if (!next) {
            nextPoint = curr
          } else {
            nextPoint = {
              col: next,
              row: shift ? rangeEnd.row : curr.row,
            }
          }
        }

        if (direction === Direction.Right) {
          const next = cols.getNext(shift ? rangeEnd.col : curr.col)

          if (!next) {
            nextPoint = curr
          } else {
            nextPoint = {
              col: next,
              row: shift ? rangeEnd.row : curr.row,
            }
          }
        }

        if (direction === Direction.Up) {
          const next = rows.getPrev(shift ? rangeEnd.row : curr.row)

          if (!next) {
            nextPoint = curr
          } else {
            nextPoint = {
              col: shift ? rangeEnd.col : curr.col,
              row: next,
            }
          }
        }

        if (direction === Direction.Down) {
          const next = rows.getNext(shift ? rangeEnd.row : curr.row)

          if (!next) {
            nextPoint = curr
          } else {
            nextPoint = {
              col: shift ? rangeEnd.col : curr.col,
              row: next,
            }
          }
        }
      } else {
        if (direction === Direction.Left) {
          const next = cols.getFirst()

          if (!next) {
            nextPoint = curr
          } else {
            nextPoint = {
              col: next,
              row: shift ? rangeEnd.row : curr.row,
            }
          }
        }

        if (direction === Direction.Right) {
          const next = cols.getLast()

          if (!next) {
            nextPoint = curr
          } else {
            nextPoint = {
              col: next,
              row: shift ? rangeEnd.row : curr.row,
            }
          }
        }

        if (direction === Direction.Up) {
          const next = rows.getFirst()

          if (!next) {
            nextPoint = curr
          } else {
            nextPoint = {
              col: shift ? rangeEnd.col : curr.col,
              row: next,
            }
          }
        }

        if (direction === Direction.Down) {
          const next = rows.getLast()

          if (!next) {
            nextPoint = curr
          } else {
            nextPoint = {
              col: shift ? rangeEnd.col : curr.col,
              row: next,
            }
          }
        }
      }

      /**
       * Scroll to ensure that the next cell is visible in the viewport.
       */
      if (nextPoint) {
        const nextCell = document.querySelector(
          `td[data-point='${nextPoint.col}-${nextPoint.row}']`
        ) as HTMLElement | null

        if (nextCell) {
          nextCell.scrollIntoView({
            behavior: "instant",
            block: "nearest",
            inline: "nearest",
          })
        }
      }

      setRangeEnd(nextPoint)

      if (!shift) {
        setAnchor(nextPoint)
      }
    }

    const onMove = (e: KeyboardEvent) => {
      /**
       * If the user is not focused on the table, do nothing. This prevents
       * the user from navigating the table when they are focused on another
       * element.
       */
      // if (!ref.current?.contains(document.activeElement)) {
      //   return
      // }

      if (!anchor || !rangeEnd) {
        setAnchor(findFirstEditableCell())
        setRangeEnd(findFirstEditableCell())
        return
      }

      if (e.key === "ArrowLeft") {
        e.preventDefault()
        moveAnchor(
          anchor,
          rangeEnd,
          Direction.Left,
          e.shiftKey,
          e.metaKey || e.ctrlKey
        )

        return
      }

      if (e.key === "ArrowRight") {
        e.preventDefault()
        moveAnchor(
          anchor,
          rangeEnd,
          Direction.Right,
          e.shiftKey,
          e.metaKey || e.ctrlKey
        )

        return
      }

      if (e.key === "ArrowUp") {
        e.preventDefault()
        moveAnchor(
          anchor,
          rangeEnd,
          Direction.Up,
          e.shiftKey,
          e.metaKey || e.ctrlKey
        )

        return
      }

      if (e.key === "ArrowDown") {
        e.preventDefault()
        moveAnchor(
          anchor,
          rangeEnd,
          Direction.Down,
          e.shiftKey,
          e.metaKey || e.ctrlKey
        )

        return
      }
    }

    document.addEventListener("keydown", onMove)

    return () => {
      document.removeEventListener("keydown", onMove)
    }
  }, [anchor, rangeEnd, cells, rows, cols])

  /**
   * If anchor is not set, find the first editable cell and set it as the anchor
   */
  React.useEffect(() => {
    if (!anchor) {
      const firstCell = findFirstEditableCell()

      if (!firstCell) {
        return
      }

      setAnchor(firstCell)
    }
  }, [anchor, findFirstEditableCell])

  /**
   * If anchor is set, set it as selected
   */
  React.useEffect(() => {
    if (!anchor) {
      return
    }

    const key = getKey(anchor)

    setSelected((selectedCells) => ({
      ...selectedCells,
      [key]: true,
    }))
  }, [anchor])

  /**
   * If anchor is set and rangeEnd is not, set rangeEnd to anchor
   */
  React.useEffect(() => {
    if (!anchor) {
      return
    }

    if (!rangeEnd) {
      setRangeEnd(anchor)
    }
  }, [anchor, rangeEnd])

  /**
   * If anchor and rangeEnd are set, calculate all cells between them
   * and add them to the array of selected cells.
   */
  React.useEffect(() => {
    if (!anchor || !rangeEnd) {
      return
    }

    const cells: Record<string, boolean> = {}

    const minX = Math.min(anchor.col, rangeEnd.col)
    const maxX = Math.max(anchor.col, rangeEnd.col)

    const minY = Math.min(anchor.row, rangeEnd.row)
    const maxY = Math.max(anchor.row, rangeEnd.row)

    for (let x = minX; x <= maxX; x++) {
      for (let y = minY; y <= maxY; y++) {
        cells[`${x}-${y}`] = true
      }
    }

    setSelected(cells)
  }, [anchor, rangeEnd])

  return (
    <BulkEditorContext.Provider
      value={React.useMemo(
        () => ({
          onFillDragStart,
          getCellState,
          registerCell,
          unregisterCell,
          selectedCells: selected,
          editedCells: edited,
          boundingBox,
        }),
        [
          onFillDragStart,
          getCellState,
          registerCell,
          unregisterCell,
          selected,
          edited,
          boundingBox,
        ]
      )}
    >
      <div>
        <div className="bg-ui-bg-base px-4 py-3">
          <DropdownMenu>
            <DropdownMenu.Trigger asChild>
              <Button variant="secondary">
                <Adjustments className="text-ui-fg-subtle" />
                View
              </Button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Content>
              <DropdownMenu.Item>Copy</DropdownMenu.Item>
              <DropdownMenu.Item>Paste</DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu>
        </div>
        <div>
          <table ref={ref} className="relative w-full table-auto">
            {children}
          </table>
        </div>
      </div>
    </BulkEditorContext.Provider>
  )
}

interface InputProps extends React.ComponentPropsWithoutRef<"input"> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, placeholder = "-", disabled, ...props }, ref) => {
    const { isDecorative } = useRowContext()

    return (
      <input
        className={clx(
          "txt-compact-small text-ui-fg-base placeholder:text-ui-fg-muted h-full w-full cursor-default appearance-none bg-transparent text-right caret-transparent outline-none",
          "[&::--webkit-number-spin-button]:hidden [&::-webkit-inner-spin-button]:hidden [&::-webkit-outer-spin-button]:hidden",
          className
        )}
        disabled={disabled || isDecorative}
        placeholder={placeholder}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

interface CellProps extends React.ComponentPropsWithoutRef<"td"> {}

const Cell = React.forwardRef<HTMLTableCellElement, CellProps>(
  ({ className, children, ...props }, ref) => {
    const [attribute, setAttribute] = React.useState<string | null>(null)
    const [point, setPoint] = React.useState<Point | null>(null)

    const innerRef = React.useRef<HTMLTableCellElement>(null)

    React.useImperativeHandle<
      HTMLTableCellElement | null,
      HTMLTableCellElement | null
    >(ref, () => innerRef.current)

    const { isDecorative } = useRowContext()

    const {
      getCellState,
      registerCell,
      unregisterCell,
      onFillDragStart,
      boundingBox,
    } = useBulkEditorContext()

    const cellIndex = innerRef.current?.cellIndex ?? null
    const rowIndex = parentIsRow(innerRef.current)
      ? innerRef.current.parentElement.rowIndex
      : null

    React.useEffect(() => {
      if (!cellIndex || !rowIndex || isDecorative) {
        return
      }

      registerCell({
        col: cellIndex,
        row: rowIndex,
      })

      return () => {
        unregisterCell({
          col: cellIndex,
          row: rowIndex,
        })
      }
    }, [cellIndex, rowIndex, isDecorative, registerCell, unregisterCell])

    React.useEffect(() => {
      if (!cellIndex || !rowIndex) {
        return
      }

      setPoint({
        col: cellIndex,
        row: rowIndex,
      })
      setAttribute(`${cellIndex}-${rowIndex}`)
    }, [cellIndex, rowIndex])

    const cellState = getCellState(point)

    const isTopBorder = point?.row === boundingBox.topLeft?.row
    const isLeftBorder = point?.col === boundingBox.topLeft?.col

    const isBottomBorder = point?.row === boundingBox.bottomRight?.row
    const isRightBorder = point?.col === boundingBox.bottomRight?.col

    const isEndCorner = isRightBorder && isBottomBorder

    return (
      <td
        ref={innerRef}
        data-editable={!isDecorative}
        data-point={attribute}
        className={clx(
          "border-ui-border-base txt-compact-small text-ui-fg-base relative h-10 border px-4 text-left",
          "focus-within:border-ui-border-interactive focus-within:bg-ui-bg-base focus-within:z-20 focus-within:border-double",
          "focus-within:after:shadow-borders-active focus-within:after:absolute focus-within:after:inset-0 focus-within:after:content-['']",
          {
            "bg-ui-bg-base": !isDecorative,
            "!bg-ui-bg-subtle": isDecorative,
          },
          {
            "bg-ui-bg-highlight z-10": cellState.isSelected,
          },
          {
            "!border-t-ui-border-interactive !border-double":
              isTopBorder && cellState.isSelected,
            "!border-b-ui-border-interactive !border-double":
              isBottomBorder && cellState.isSelected,
            "!border-l-ui-border-interactive !border-double":
              isLeftBorder && cellState.isSelected && !isDecorative,
            "!border-r-ui-border-interactive !border-double":
              isRightBorder && cellState.isSelected && !isDecorative,
          },
          className
        )}
        {...props}
      >
        {children}
        {isEndCorner && (
          <span
            onMouseDown={onFillDragStart}
            className="bg-ui-bg-interactive absolute -bottom-1 -right-1 h-2 w-2 cursor-crosshair rounded-full"
          />
        )}
      </td>
    )
  }
)
Cell.displayName = "BulkEditor.Cell"

interface HeaderCellProps extends React.ComponentPropsWithoutRef<"th"> {}

const HeaderCell = React.forwardRef<HTMLTableCellElement, HeaderCellProps>(
  ({ className, ...props }, ref) => {
    return (
      <th
        ref={ref}
        className={clx(
          "txt-compact-small-plus text-ui-fg-subtle border-ui-border-base h-10 border px-4 text-left",
          className
        )}
        {...props}
      />
    )
  }
)
HeaderCell.displayName = "BulkEditor.HeaderCell"

interface HeaderProps extends React.ComponentPropsWithoutRef<"thead"> {
  lock?: boolean
}

const Header = React.forwardRef<HTMLTableSectionElement, HeaderProps>(
  ({ className, ...props }, ref) => {
    return (
      <thead
        ref={ref}
        className={clx("border-ui-border-base bg-ui-bg-base border", className)}
        {...props}
      />
    )
  }
)
Header.displayName = "BulkEditor.Header"

type BodyProps = React.ComponentPropsWithoutRef<"tbody">

const Body = React.forwardRef<HTMLTableSectionElement, BodyProps>(
  (props, ref) => {
    return <tbody ref={ref} {...props} />
  }
)
Body.displayName = "BulkEditor.Body"

type RowContextValue = {
  isDecorative: boolean
}

const RowContext = React.createContext<RowContextValue | null>(null)

const useRowContext = () => {
  const context = React.useContext(RowContext)

  if (!context) {
    throw new Error("useRowContext should be used within a BulkEditor.Row")
  }

  return context
}

interface RowProps extends React.ComponentPropsWithoutRef<"tr"> {
  isDecorative?: boolean
}

const Row = React.forwardRef<HTMLTableRowElement, RowProps>(
  ({ className, isDecorative = false, ...props }, ref) => {
    return (
      <RowContext.Provider
        value={React.useMemo(
          () => ({
            isDecorative,
          }),
          [isDecorative]
        )}
      >
        <tr
          ref={ref}
          className={clx(
            "border-ui-border-base border-b",
            {
              "bg-ui-bg-base": !isDecorative,
              "bg-ui-bg-subtle": isDecorative,
            },
            className
          )}
          {...props}
        />
      </RowContext.Provider>
    )
  }
)
Row.displayName = "BulkEditor.Row"

interface RowLabelProps extends React.ComponentPropsWithoutRef<"td"> {}

const RowLabel = React.forwardRef<HTMLTableCellElement, RowLabelProps>(
  ({ className, ...props }, ref) => {
    return (
      <td
        ref={ref}
        data-editable={false}
        className={clx(
          "border-ui-border-base txt-compact-small-plus text-ui-fg-subtle border-r px-4 text-left",
          className
        )}
        {...props}
      />
    )
  }
)
RowLabel.displayName = "BulkEditor.RowLabel"

interface DecorativeRowProps extends React.ComponentPropsWithoutRef<"tr"> {}

const DecorativeRow = React.forwardRef<HTMLTableRowElement, DecorativeRowProps>(
  (props, ref) => {
    return <tr ref={ref} {...props} />
  }
)
DecorativeRow.displayName = "BulkEditor.DecorativeRow"

const BulkEditor = Object.assign(Root, {
  Input,
  Cell,
  HeaderCell,
  Row,
  RowLabel,
  DecorativeRow,
  Header,
  Body,
})

export { BulkEditor }

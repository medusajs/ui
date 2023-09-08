import { Adjustments, Minus } from "@medusajs/icons"
import * as React from "react"

import { Button } from "@/components/button"
import { DropdownMenu } from "@/components/dropdown-menu"
import { clx } from "@/utils/clx"
import CurrencyInput from "react-currency-input-field"
import { BulkEditorContext, useBulkEditorContext } from "./bulk-editor-context"
import { ArrowKey } from "./constants"
import {
  calculateBoundingBoxes,
  findFirstCell,
  getBorderAttributes,
  getInputValues,
  getInputs,
  getKey,
  getPoint,
  getPointFromKey,
  getRange,
  parentIsRow,
  shouldRenderFillHandle,
  validateMouseOverTarget,
  validateTarget,
} from "./helpers"
import { CommandHistory, PasteCommand, SortedSet } from "./models"
import {
  BoundingBox,
  CellState,
  CellWithParentRow,
  ColumnState,
  Point,
} from "./types"

const Root = ({ children }: React.PropsWithChildren) => {
  const commandHistory = React.useMemo(() => new CommandHistory(), [])

  const [anchor, setAnchor] = React.useState<Point | null>(null)
  const [rangeEnd, setRangeEnd] = React.useState<Point | null>(null)

  const [fillAnchor, setFillAnchor] = React.useState<Point | null>(null)
  const [fillRangeEnd, setFillRangeEnd] = React.useState<Point | null>(null)

  const cols: SortedSet<number> = React.useMemo(() => new SortedSet(), [])
  const rows: SortedSet<number> = React.useMemo(() => new SortedSet(), [])

  const [cells, setCells] = React.useState<Record<string, boolean>>({})
  const [edited, setEdited] = React.useState<
    Record<string, number | undefined>
  >({})

  const [selected, setSelected] = React.useState<Record<string, boolean>>({})
  const [toFill, setToFill] = React.useState<Record<string, boolean>>({})

  const [columnState, setColumnState] = React.useState<
    Record<number, ColumnState>
  >({})
  const [columnVisibility, setColumnVisibility] = React.useState<
    Record<number, boolean>
  >({})

  const [fillValues, setFillValues] = React.useState<string | null>(null)

  const [boundingBoxes, setBoundingBoxes] = React.useState<BoundingBox[]>([])
  const [fillBoundingBoxes, setFillBoundingBoxes] = React.useState<
    BoundingBox[]
  >([])

  const [isDragFill, setIsDragFill] = React.useState(false)
  const [isDragging, setIsDragging] = React.useState(false)

  const ref = React.useRef<HTMLTableElement>(null)

  const registerColumn = React.useCallback((state: ColumnState) => {
    setColumnState((columns) => ({
      ...columns,
      [state.colIndex]: state,
    }))

    setColumnVisibility((columns) => ({
      ...columns,
      [state.colIndex]: state.isVisible,
    }))
  }, [])

  const onUpdateColumnVisibility = React.useCallback(
    (column: number, visible: boolean) => {
      setColumnState((columns) => ({
        ...columns,
        [column]: {
          ...columns[column],
          visible: columns[column].canHide ? visible : true,
        },
      }))
    },
    []
  )

  /** State actions */

  /**
   * Clears the Anchor, RangeEnd, Selected, and Bounding Boxes.
   */
  const clearSelection = React.useCallback(() => {
    setAnchor(null)
    setBoundingBoxes([])
    setSelected({})
    setRangeEnd(null)
  }, [])

  /**
   * Sets the starting point of a drag selection.
   */
  const setStartingPoint = React.useCallback((point: Point) => {
    setAnchor(point)
    setRangeEnd(point)
  }, [])

  /** Drag fill handlers */

  const onInitiateDragFill = React.useCallback(
    (e: React.MouseEvent) => {
      if (!selected) {
        return
      }

      e.stopPropagation()
      e.preventDefault()

      const keys = Object.keys(selected)

      const inputs = getInputs(keys, ref.current)
      const values = getInputValues(inputs)

      setFillValues(values)
      setIsDragFill(true)
    },
    [selected]
  )

  const onDragHandleMove = React.useCallback(
    (e: MouseEvent) => {
      if (!isDragFill || !anchor) {
        return
      }

      const target = validateMouseOverTarget(
        e.target as HTMLElement | null,
        anchor.col
      )

      if (!target) {
        return
      }

      const point = getPoint(target)
      const key = getKey(point)

      if (point.row === anchor.row) {
        setFillAnchor(null)
        setFillRangeEnd(null)
        setFillBoundingBoxes([])
        setToFill({})
        return
      }

      /**
       * If the target cell is selected, do nothing.
       */
      if (selected[key]) {
        return
      }

      if (!fillAnchor) {
        setFillAnchor(point)
      }

      setFillRangeEnd(getPoint(target as CellWithParentRow))

      // Ensure that the scroll position follows the mouse
      target.scrollIntoView({
        behavior: "instant",
        block: "end",
        inline: "end",
      })
    },
    [isDragFill, selected, anchor, fillAnchor]
  )

  const onDragHandleMouseUp = React.useCallback(
    (_e: MouseEvent) => {
      if (!isDragFill) {
        return
      }

      setIsDragFill(false)

      const keys = Object.keys(toFill)

      if (keys.length === 0) {
        return
      }

      const inputs = getInputs(keys, ref.current)

      if (!fillValues) {
        return
      }

      const fillCommand = new PasteCommand({
        cells: inputs,
        data: fillValues,
      })

      commandHistory.execute(fillCommand)

      setFillValues(null)
      setFillAnchor(null)
      setFillRangeEnd(null)
      setToFill({})
      setFillBoundingBoxes([])
    },
    [isDragFill, toFill, fillValues, commandHistory]
  )

  React.useEffect(() => {
    if (!fillAnchor || !fillRangeEnd) {
      return
    }

    const fillRange = getRange(fillAnchor, fillRangeEnd)

    setToFill(fillRange)
  }, [fillAnchor, fillRangeEnd])

  React.useEffect(() => {
    const keys = Object.keys(toFill)

    if (keys.length === 0) {
      return
    }

    const points = keys
      .map((key) => {
        return getPointFromKey(key)
      })
      .filter((point) => !!point) as Point[]

    const boundingBoxes = calculateBoundingBoxes(points)

    setFillBoundingBoxes(boundingBoxes)
  }, [toFill])

  React.useEffect(() => {
    document.addEventListener("mousemove", onDragHandleMove)
    document.addEventListener("mouseup", onDragHandleMouseUp)

    return () => {
      document.removeEventListener("mousemove", onDragHandleMove)
      document.removeEventListener("mouseup", onDragHandleMouseUp)
    }
  }, [onDragHandleMove, onDragHandleMouseUp])

  /** Mouse event handlers */

  /**
   * Handles the mouse down event.
   * This initializes the drag to select functionality.
   */
  const onMouseDown = React.useCallback(
    (e: MouseEvent) => {
      const target = e.target as HTMLElement | null

      const cell = validateTarget(target)

      if (!cell) {
        return
      }

      setIsDragging(true)

      if (e.shiftKey) {
        setSelected({})
        setRangeEnd(getPoint(cell))
        return
      }

      if (e.ctrlKey || e.metaKey) {
        if (selected[getKey(getPoint(cell))]) {
          /**
           * If the user is holding down the ctrl or cmd key, and the cell is
           * already selected, we remove it from the selection.
           */
          setSelected((selectedCells) => {
            const { [getKey(getPoint(cell))]: _old, ...rest } = selectedCells

            return rest
          })
          return
        }

        /**
         * If the user is holding down the ctrl or cmd key, we do not clear the
         * selection. This allows the user to select multiple cells.
         */
        setStartingPoint(getPoint(cell))
        return
      }

      // TOOO: Add support for shift + click
      // TODO: Add support for cmd + click

      clearSelection()
      setStartingPoint(getPoint(cell))
    },
    [clearSelection, setStartingPoint, selected]
  )

  /**
   * Handles the mouse move event.
   * This is used to update the RangeEnd when the user is dragging.
   */
  const onMouseMove = React.useCallback(
    (e: MouseEvent) => {
      if (!anchor || !isDragging || isDragFill) {
        return
      }

      const target = validateMouseOverTarget(
        e.target as HTMLElement | null,
        anchor.col
      )

      if (!target) {
        return
      }

      setRangeEnd(getPoint(target))
    },
    [isDragging, isDragFill, anchor]
  )

  /**
   * Handles the mouse up event.
   * This is used to finalize the drag to select functionality.
   */
  const onMouseUp = React.useCallback(
    (e: MouseEvent) => {
      if (!anchor || isDragFill) {
        return
      }

      setIsDragging(false)

      const target = validateMouseOverTarget(
        e.target as HTMLElement | null,
        anchor.col
      )

      if (!target) {
        return
      }

      setRangeEnd(getPoint(target))
    },
    [isDragFill, anchor]
  )

  /**
   * Add event listeners for mouse events.
   */
  React.useEffect(() => {
    document.addEventListener("mousedown", onMouseDown)
    document.addEventListener("mousemove", onMouseMove)
    document.addEventListener("mouseup", onMouseUp)

    return () => {
      document.removeEventListener("mousedown", onMouseDown)
      document.removeEventListener("mousemove", onMouseMove)
      document.removeEventListener("mouseup", onMouseUp)
    }
  }, [onMouseDown, onMouseMove, onMouseUp])

  /** Tab key event handlers */

  /**
   * Handles the tab key event.
   */
  const onTab = React.useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Tab") {
        e.preventDefault()

        if (!e.shiftKey) {
          if (!anchor) {
            return
          }

          const next = cols.getNext(anchor.col)

          if (!next) {
            const nextRow = rows.getNext(anchor.row)

            if (!nextRow) {
              return
            }

            const nextPoint: Point = {
              col: cols.getFirst()!,
              row: nextRow,
            }

            setAnchor(nextPoint)
            setRangeEnd(nextPoint)
            return
          }

          const nextPoint: Point = {
            col: next,
            row: anchor.row,
          }

          setAnchor(nextPoint)
          setRangeEnd(nextPoint)
        } else {
          if (!anchor) {
            return
          }

          const prev = cols.getPrev(anchor.col)

          if (!prev) {
            const prevRow = rows.getPrev(anchor.row)

            if (!prevRow) {
              return
            }

            const prevPoint: Point = {
              col: cols.getLast()!,
              row: prevRow,
            }

            setAnchor(prevPoint)
            setRangeEnd(prevPoint)
            return
          }

          const prevPoint: Point = {
            col: prev,
            row: anchor.row,
          }

          setAnchor(prevPoint)
          setRangeEnd(prevPoint)
        }
      }
    },
    [anchor, cols, rows]
  )

  React.useEffect(() => {
    document.addEventListener("keydown", onTab)

    return () => {
      document.removeEventListener("keydown", onTab)
    }
  }, [onTab])

  /** Arrow key event handlers */

  React.useEffect(() => {
    const moveAnchor = (
      curr: Point,
      rangeEnd: Point,
      direction: ArrowKey,
      shift: boolean,
      cmd: boolean
    ) => {
      let nextPoint: Point | null = null

      if (!cmd) {
        if (direction === ArrowKey.Left) {
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

        if (direction === ArrowKey.Right) {
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

        if (direction === ArrowKey.Up) {
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

        if (direction === ArrowKey.Down) {
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
        if (direction === ArrowKey.Left) {
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

        if (direction === ArrowKey.Right) {
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

        if (direction === ArrowKey.Up) {
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

        if (direction === ArrowKey.Down) {
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
      if (!nextPoint) {
        return
      }

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

      setRangeEnd(nextPoint)

      if (!shift) {
        setSelected({
          [getKey(nextPoint)]: true,
        })
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
        setAnchor(findFirstCell())
        setRangeEnd(findFirstCell())
        return
      }

      if (e.key === "ArrowLeft") {
        e.preventDefault()
        moveAnchor(
          anchor,
          rangeEnd,
          ArrowKey.Left,
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
          ArrowKey.Right,
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
          ArrowKey.Up,
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
          ArrowKey.Down,
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

  /** Command history handlers */

  /**
   * Undo the last executed command.
   */
  const onUndo = React.useCallback(() => {
    commandHistory.undo()
  }, [commandHistory])

  /**
   * Redo the last command that has been undone.
   */
  const onRedo = React.useCallback(() => {
    commandHistory.redo()
  }, [commandHistory])

  React.useEffect(() => {
    document.addEventListener("keydown", (e) => {
      if (e.key === "z" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()

        if (e.shiftKey) {
          onRedo()
          return
        }

        onUndo()
      }
    })
  }, [onUndo, onRedo])

  /** Copy/Paste handlers */

  const onCopy = React.useCallback(
    (e: ClipboardEvent) => {
      if (!anchor || !rangeEnd) {
        return
      }

      const keys = Object.keys(selected)

      const selectedCells: NodeListOf<HTMLInputElement> | undefined = getInputs(
        keys,
        ref.current
      )

      /**
       * Get the values of each selected cell in the format `value1;value2;...;`.
       */
      const values = getInputValues(selectedCells)

      /**
       * Copy the string to the clipboard.
       */
      e.clipboardData?.setData("text/plain", values)

      e.preventDefault()
    },
    [anchor, rangeEnd, selected]
  )

  const onPaste = React.useCallback(
    (e: ClipboardEvent) => {
      if (!anchor || !rangeEnd) {
        return
      }

      const keys = Object.keys(selected)

      const cells: NodeListOf<HTMLInputElement> | undefined = getInputs(
        keys,
        ref.current
      )

      /**
       * Split the clipboard data into an array of values.
       */
      const data = e.clipboardData?.getData("text/plain") ?? ""

      const pasteCommand = new PasteCommand({
        cells,
        data,
      })

      commandHistory.execute(pasteCommand)

      e.preventDefault()
    },
    [anchor, rangeEnd, selected, commandHistory]
  )

  React.useEffect(() => {
    document.addEventListener("copy", onCopy)
    document.addEventListener("paste", onPaste)

    return () => {
      document.removeEventListener("copy", onCopy)
      document.removeEventListener("paste", onPaste)
    }
  }, [onCopy, onPaste])

  /** Bounding Box handler */

  React.useEffect(() => {
    /**
     * If the user is dragging, do nothing.
     */
    if (isDragging) {
      return
    }

    const keys = Object.keys(selected)

    if (keys.length === 0) {
      return
    }

    const points = keys
      .map((key) => {
        return getPointFromKey(key)
      })
      .filter((point) => !!point) as Point[]

    const boundingBoxes = calculateBoundingBoxes(points)

    setBoundingBoxes(boundingBoxes)
  }, [isDragging, selected])

  const getCellState = React.useCallback(
    (point: Point | null): CellState => {
      if (!point) {
        return {
          isSelected: false,
          isAnchor: false,
        }
      }

      const key = getKey(point)

      const state: CellState = {
        isSelected: !!selected[key],
        isAnchor: anchor
          ? anchor.row === point.row && anchor.col === point.col
          : false,
      }

      return state
    },
    [anchor, selected]
  )

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

  /**
   * If anchor is not set, find the first editable cell and set it as the anchor
   */
  React.useEffect(() => {
    if (!anchor) {
      const firstCell = findFirstCell()

      if (!firstCell) {
        return
      }

      setAnchor(firstCell)
    }
  }, [anchor])

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

    const range = getRange(anchor, rangeEnd)

    setSelected(range)
  }, [anchor, rangeEnd])

  return (
    <BulkEditorContext.Provider
      value={React.useMemo(
        () => ({
          onInitiateDragFill,
          getCellState,
          registerCell,
          unregisterCell,
          registerColumn,
          anchor,
          columnState,
          boundingBoxes,
          fillBoundingBoxes,
        }),
        [
          onInitiateDragFill,
          getCellState,
          registerCell,
          unregisterCell,
          registerColumn,
          anchor,
          columnState,
          boundingBoxes,
          fillBoundingBoxes,
        ]
      )}
    >
      <div>
        <div className="bg-ui-bg-base border-ui-border-base border-b px-4 py-3">
          <DropdownMenu>
            <DropdownMenu.Trigger asChild>
              <Button variant="secondary">
                <Adjustments className="text-ui-fg-subtle" />
                View
              </Button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Content>
              {Object.values(columnState).map((column) => {
                return (
                  <DropdownMenu.Item
                    key={column.colIndex}
                    onClick={() =>
                      onUpdateColumnVisibility(
                        column.colIndex,
                        !column.isVisible
                      )
                    }
                  >
                    {column.name}
                  </DropdownMenu.Item>
                )
              })}
            </DropdownMenu.Content>
          </DropdownMenu>
        </div>
        <div
          className={clx({
            "select-none": isDragging,
            "select-auto": !isDragging,
          })}
        >
          <table
            ref={ref}
            className="relative w-full table-auto border-collapse"
          >
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

interface MoneyInputProps
  extends Omit<
    React.ComponentPropsWithoutRef<"input">,
    "type" | "min" | "value" | "defaultValue" | "step"
  > {
  value?: number
  defaultValue?: number
  prefix?: string
  decimalDigits: number
}

const MoneyInput = React.forwardRef<HTMLInputElement, MoneyInputProps>(
  (
    {
      className,
      prefix,
      decimalDigits,
      value,
      defaultValue,
      onChange,
      ...props
    },
    ref
  ) => {
    const [dbSafeValue, setDbSafeValue] = React.useState<number | undefined>(
      value ?? defaultValue
    )

    const getPresentationalValue = React.useCallback(() => {
      if (dbSafeValue === undefined) {
        return undefined
      }

      return dbSafeValue / 10 ** decimalDigits
    }, [dbSafeValue, decimalDigits])

    const getDbSafeValue = React.useCallback(
      (value: number | undefined) => {
        if (value === undefined) {
          return undefined
        }

        return value * 10 ** decimalDigits
      },
      [decimalDigits]
    )

    const onValueChange = React.useCallback(
      (value: string | undefined) => {
        if (!value) {
          setDbSafeValue(undefined)
          return
        }

        const parsed = parseFloat(value)

        if (isNaN(parsed)) {
          setDbSafeValue(undefined)
          return
        }

        setDbSafeValue(getDbSafeValue(parsed))
      },
      [getDbSafeValue]
    )

    const innerRef = React.useRef<HTMLInputElement>(null)

    React.useImperativeHandle<HTMLInputElement | null, HTMLInputElement | null>(
      ref,
      () => innerRef.current
    )

    console.log(innerRef.current?.value)

    return (
      <div className={clx("flex items-center", className)}>
        <span className="text-ui-fg-muted">{prefix}</span>
        <CurrencyInput
          ref={innerRef}
          decimalsLimit={decimalDigits}
          value={getPresentationalValue()}
          onValueChange={(value) => onValueChange(value)}
          onChange={(e) => {
            console.log(e)
          }}
          className="flex-1 appearance-none bg-transparent text-right outline-none"
          {...props}
        />
      </div>
    )
  }
)
MoneyInput.displayName = "MoneyInput"

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
      anchor,
      columnState,
      boundingBoxes,
      fillBoundingBoxes,
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

    const isHidden = React.useMemo(() => {
      if (!cellIndex) {
        return false
      }

      return columnState[cellIndex]?.isVisible === false
    }, [cellIndex, columnState])

    const cellState = getCellState(point)

    const borderAttributes = getBorderAttributes(point, boundingBoxes)
    const fillBorderAttributes = getBorderAttributes(point, fillBoundingBoxes)
    const isEndCorner = shouldRenderFillHandle(point, anchor, boundingBoxes)

    if (isHidden) {
      return null
    }

    return (
      <td
        ref={innerRef}
        data-editable={!isDecorative}
        data-point={attribute}
        aria-rowindex={rowIndex ?? undefined}
        aria-colindex={cellIndex ?? undefined}
        className={clx(
          "border-ui-border-base txt-compact-small text-ui-fg-base relative h-10 border px-4 text-left",
          "focus-within:border-ui-border-interactive focus-within:bg-ui-bg-base focus-within:z-20 focus-within:border-double",
          "focus-within:after:shadow-borders-active focus-within:after:absolute focus-within:after:inset-0 focus-within:after:content-['']",
          "before:pointer-events-none before:absolute before:inset-0 before:border-dashed before:content-['']",
          {
            "bg-ui-bg-base": !isDecorative,
            "!bg-ui-bg-subtle": isDecorative,
          },
          {
            "bg-ui-bg-highlight z-10": cellState.isSelected,
          },
          {
            "!border-t-ui-border-interactive !border-double":
              borderAttributes.top,
            "!border-b-ui-border-interactive !border-double":
              borderAttributes.bottom,
            "!border-l-ui-border-interactive !border-double":
              borderAttributes.left,
            "!border-r-ui-border-interactive !border-double":
              borderAttributes.right,
          },
          {
            "before:!border-t-ui-border-interactive before:border-t":
              fillBorderAttributes.top && !cellState.isSelected,
            "before:!border-b-ui-border-interactive before:border-b":
              fillBorderAttributes.bottom && !cellState.isSelected,
            "before:!border-l-ui-border-interactive before:border-l":
              fillBorderAttributes.left && !cellState.isSelected,
            "before:!border-r-ui-border-interactive before:border-r":
              fillBorderAttributes.right && !cellState.isSelected,
          },
          {
            hidden: isHidden,
          },
          className
        )}
        {...props}
      >
        {children}
        {isEndCorner && <DragHandle />}
      </td>
    )
  }
)
Cell.displayName = "BulkEditor.Cell"

interface DragHandleProps extends React.ComponentPropsWithoutRef<"span"> {}

const DragHandle = React.forwardRef<HTMLSpanElement, DragHandleProps>(
  ({ className, ...props }, ref) => {
    const { onInitiateDragFill } = useBulkEditorContext()

    return (
      <span
        ref={ref}
        onMouseDown={onInitiateDragFill}
        className={clx(
          "bg-ui-bg-interactive absolute -bottom-1 -right-1 z-[9999] h-2 w-2 cursor-crosshair rounded-full",
          className
        )}
        {...props}
      />
    )
  }
)
DragHandle.displayName = "BulkEditor.DragHandle"

interface HeaderCellProps extends React.ComponentPropsWithoutRef<"th"> {
  name: string
  canHide?: boolean
  defaultVisible?: boolean
}

const HeaderCell = React.forwardRef<HTMLTableCellElement, HeaderCellProps>(
  (
    {
      className,
      name,
      canHide = true,
      defaultVisible = true,
      children,
      ...props
    },
    ref
  ) => {
    const { registerColumn, columnState } = useBulkEditorContext()

    const innerRef = React.useRef<HTMLTableCellElement>(null)

    React.useImperativeHandle<
      HTMLTableCellElement | null,
      HTMLTableCellElement | null
    >(ref, () => innerRef.current)

    const cellIndex = innerRef.current?.cellIndex ?? null

    const state = React.useMemo(() => {
      if (!cellIndex) {
        return null
      }

      return columnState[cellIndex]
    }, [cellIndex, columnState])

    const isHidden = React.useMemo(() => {
      if (!state) {
        return false
      }

      return state.isVisible === false
    }, [state])

    React.useEffect(() => {
      if (!cellIndex) {
        return
      }

      registerColumn({
        colIndex: cellIndex,
        name,
        canHide,
        isVisible: defaultVisible,
      })
    }, [cellIndex, defaultVisible, name, canHide, registerColumn])

    return (
      <th
        ref={innerRef}
        className={clx(
          "txt-compact-small-plus text-ui-fg-subtle h-10 p-0 text-left",
          {
            hidden: isHidden,
          },
          className
        )}
        {...props}
      >
        <div className="border-ui-border-base flex h-full w-full items-center border-b border-r px-4">
          {children}
        </div>
      </th>
    )
  }
)
HeaderCell.displayName = "BulkEditor.HeaderCell"

interface HeaderProps extends React.ComponentPropsWithoutRef<"thead"> {
  lock?: boolean
}

const Header = React.forwardRef<HTMLTableSectionElement, HeaderProps>(
  ({ className, lock = false, ...props }, ref) => {
    return (
      <thead
        ref={ref}
        className={clx(
          "bg-ui-bg-base border-collapse border-0",
          {
            "sticky top-0 z-50": lock,
          },
          className
        )}
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
            "border-ui-border-base [&_th_div:last-of-type]:border-r-0] border-b",
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

interface PaginationProps extends React.HTMLAttributes<HTMLDivElement> {
  count: number
  pageSize: number
  pageIndex: number
  pageCount: number
  canPreviousPage: boolean
  canNextPage: boolean
  previousPage: () => void
  nextPage: () => void
}

const Pagination = React.forwardRef<HTMLDivElement, PaginationProps>(
  (
    {
      className,
      count,
      pageSize,
      pageCount,
      pageIndex,
      canPreviousPage,
      canNextPage,
      nextPage,
      previousPage,
      ...props
    },
    ref
  ) => {
    const { from, to } = React.useMemo(() => {
      const from = count === 0 ? count : pageIndex * pageSize + 1
      const to = Math.min(count, (pageIndex + 1) * pageSize)

      return { from, to }
    }, [count, pageIndex, pageSize])

    return (
      <div
        ref={ref}
        className={clx(
          "text-ui-fg-subtle txt-compact-small-plus flex w-full items-center justify-between px-5 pb-6 pt-4",
          className
        )}
        {...props}
      >
        <div className="inline-flex items-center gap-x-1 px-3 py-[5px]">
          <p>{from}</p>
          <Minus className="text-ui-fg-muted" />
          <p>{`${to} of ${count} results`}</p>
        </div>
        <div className="flex items-center gap-x-2">
          <div className="inline-flex items-center gap-x-1 px-3 py-[5px]">
            <p>
              {pageIndex + 1} of {Math.max(pageCount, 1)}
            </p>
          </div>
          <Button
            variant={"transparent"}
            onClick={previousPage}
            disabled={!canPreviousPage}
          >
            Prev
          </Button>
          <Button
            variant={"transparent"}
            onClick={nextPage}
            disabled={!canNextPage}
          >
            Next
          </Button>
        </div>
      </div>
    )
  }
)
Pagination.displayName = "Pagination"

const BulkEditor = Object.assign(Root, {
  Input,
  MoneyInput,
  Cell,
  HeaderCell,
  Row,
  RowLabel,
  DecorativeRow,
  Header,
  Body,
  Pagination,
})

export { BulkEditor }

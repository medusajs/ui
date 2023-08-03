import {
  ChevronDownMini,
  ChevronUpMini,
  EllipsisHorizontal,
  Spinner,
} from "@medusajs/icons"
import { rankItem } from "@tanstack/match-sorter-utils"
import {
  ColumnDef,
  FilterFn,
  Table as Primitive,
  Row,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table"
import * as React from "react"

import { Button } from "@/components/button"
import { Checkbox } from "@/components/checkbox"
import { DropdownMenu } from "@/components/dropdown-menu"
import { Heading } from "@/components/heading"
import { Table } from "@/components/table"
import { clx } from "@/utils/clx"
import { Input } from "../../components/input"

type RowAction<TData> = {
  label: string
  icon: React.ComponentType<{ className?: string }>
  onClick: ({ row }: { row: Row<TData> }) => void
}

type DataTableProps<TData> = {
  title: string
  columns: ColumnDef<TData>[]
  data?: TData[]
  rowActions?: RowAction<TData>[]
  className?: string
} & (
  | {
      isSelectable: true
      onSelectionChange?: (rows: Row<TData>[]) => void
    }
  | {
      isSelectable?: false
      onSelectionChange?: never
    }
) &
  (
    | {
        isSearchable: true
        searchPlaceholder?: string
        searchValue?: string
        onSearch: (query: string) => void
      }
    | {
        isSearchable?: false
        searchPlaceholder?: never
        searchValue?: never
        onSearch?: never
      }
  ) &
  (
    | {
        isPaginated: true
        pageSize?: number
        onNextPage: () => void
        onPreviousPage: () => void
      }
    | {
        isPaginated?: false
        pageSize?: never
        onNextPage?: never
        onPreviousPage?: never
      }
  )

const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
  // Rank the item
  const itemRank = rankItem(row.getValue(columnId), value)

  // Store the itemRank info
  addMeta({
    itemRank,
  })

  // Return if the item should be filtered in/out
  return itemRank.passed
}

function DebouncedInput({
  value: initialValue,
  onChange,
  debounce = 500,
  ...props
}: {
  value: string | number
  onChange: (value: string | number) => void
  debounce?: number
} & Omit<React.ComponentProps<typeof Input>, "onChange">) {
  const ref = React.useRef<HTMLInputElement>(null)
  const [value, setValue] = React.useState(initialValue)

  React.useEffect(() => {
    setValue(initialValue)

    // Keep the input focused
    if (ref.current) {
      ref.current.focus()
    }
  }, [initialValue])

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value)
    }, debounce)

    return () => clearTimeout(timeout)
  }, [value])

  return (
    <Input
      {...props}
      ref={ref}
      size="small"
      type="search"
      value={value}
      onChange={(e) => {
        setValue(e.target.value)
      }}
    />
  )
}

const DataTable = <TData,>({
  title,
  columns,
  data,
  isSelectable = false,
  onSelectionChange,
  isSearchable = false,
  searchPlaceholder = "Search",
  searchValue,
  onSearch,
  isPaginated = false,
  pageSize,
  onNextPage,
  onPreviousPage,
  rowActions,
  className,
}: DataTableProps<TData>) => {
  // TODO - implement controlled sorting, pagination, selection, and filter state
  const [globalFilter, setGlobalFilter] = React.useState<string>("")

  const DEFAULT_PAGE_SIZE = 12
  const NUMBER_OF_ROWS = isPaginated
    ? pageSize
      ? pageSize
      : DEFAULT_PAGE_SIZE
    : data?.length ?? 0
  const ROW_HEIGHT = 48

  const table = useReactTable({
    columns,
    data: data ?? [],
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: isPaginated ? getPaginationRowModel() : undefined,
    getFilteredRowModel: isSearchable ? getFilteredRowModel() : undefined,
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: isSearchable ? fuzzyFilter : undefined,
    state: {
      globalFilter: globalFilter,
    },
  })

  return (
    <div className={clx(className)}>
      <div className="flex items-center justify-between px-8 pb-4 pt-6">
        <Heading level="h1">{title}</Heading>
        {isSearchable && (
          <DebouncedInput
            value={globalFilter}
            onChange={(value) => setGlobalFilter(String(value))}
            placeholder={searchPlaceholder}
          />
        )}
      </div>
      <div
        style={{
          height: `calc(${ROW_HEIGHT}px * ${NUMBER_OF_ROWS} + ${ROW_HEIGHT}px)`, // Prevent layout shifts when number of rows changes, by setting a fixed height based on the number of rows plus the header row
        }}
      >
        <Table>
          <Table.Header>
            {table.getHeaderGroups().map((headerGroup) => (
              <Table.Row key={headerGroup.id}>
                <SelectHeaderCell
                  table={table}
                  isSelectable={isSelectable ?? false}
                />
                {headerGroup.headers.map((header) => (
                  <Table.HeaderCell key={header.id} colSpan={header.colSpan}>
                    {header.isPlaceholder ? null : (
                      <div
                        className={clx("flex items-center gap-x-1", {
                          "cursor-pointer select-none":
                            header.column.getCanSort(),
                        })}
                        onClick={header.column.getToggleSortingHandler()}
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        {{
                          asc: <ChevronUpMini />,
                          desc: <ChevronDownMini />,
                        }[header.column.getIsSorted() as string] ?? null}
                      </div>
                    )}
                  </Table.HeaderCell>
                ))}
                <ActionsHeaderCell rowActions={rowActions} />
              </Table.Row>
            ))}
          </Table.Header>
          <Table.Body>
            {table.getRowModel().rows.map((row) => (
              <Table.Row
                key={row.id}
                className={clx(
                  "[&_td:last-child]:w-[1%] [&_td:last-child]:whitespace-nowrap",
                  {
                    "bg-ui-bg-highlight hover:bg-ui-bg-highlight-hover":
                      row.getIsSelected(),
                  }
                )}
              >
                <SelectCell row={row} isSelectable={isSelectable ?? false} />
                {row.getVisibleCells().map((cell) => {
                  return (
                    <Table.Cell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </Table.Cell>
                  )
                })}
                <ActionsCell row={row} rowActions={rowActions} />
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
      {isPaginated && (
        <Table.Pagination
          canNextPage={table.getCanNextPage()}
          canPreviousPage={table.getCanPreviousPage()}
          count={data?.length ?? 0}
          pageCount={table.getPageCount()}
          pageIndex={table.getState().pagination.pageIndex}
          nextPage={table.nextPage}
          previousPage={table.previousPage}
          pageSize={table.getState().pagination.pageSize}
        />
      )}
    </div>
  )
}

type DataTableContextValues<TData> = {
  /**
   * The table instance.
   */
  table: Primitive<TData>
  /**
   * Optional row actions to apply to each row.
   */
  rowActions?: RowAction<TData>[]
  /**
   * The number of rows to render in the table view.
   */
  numberOfRows: number
  /**
   * Whether the table data is loading.
   */
  isLoading: boolean
  /**
   * Whether the table is searchable.
   */
  isSearchable: boolean
  searchPlaceholder?: string
  globalFilter?: string
  onGlobalFilterChange?: (query: string) => void
  isSelectable: boolean
  onSelectionChange?: (rows: Row<TData>[]) => void
}

const DataTableContext =
  React.createContext<DataTableContextValues<any> | null>(null)

const useDataTable = () => {
  const context = React.useContext(DataTableContext)

  if (!context) {
    throw new Error("useDataTable must be used within a DataTable")
  }

  return context
}

type DataProps<TData> = {
  columns: ColumnDef<TData>[]
  data?: TData[]
  rowActions?: RowAction<TData>[]
  isLoading?: boolean
  className?: string
  children: React.ReactNode
} & (
  | {
      isSelectable: true
      onSelectionChange?: (rows: Row<TData>[]) => void
    }
  | {
      isSelectable?: false
      onSelectionChange?: never
    }
) &
  (
    | {
        isSearchable: true
        searchPlaceholder?: string
        searchValue?: string
        onSearch: (query: string) => void
      }
    | {
        isSearchable?: false
        searchPlaceholder?: never
        searchValue?: never
        onSearch?: never
      }
  ) &
  (
    | {
        isPaginated: true
        pageSize?: number
        onNextPage: () => void
        onPreviousPage: () => void
      }
    | {
        isPaginated?: false
        pageSize?: never
        onNextPage?: never
        onPreviousPage?: never
      }
  )

const Root = <TData,>({
  columns,
  data,
  isLoading = false,
  isSelectable = false,
  onSelectionChange,
  isSearchable = false,
  searchPlaceholder = "Search",
  searchValue,
  onSearch,
  isPaginated = false,
  pageSize,
  onNextPage,
  onPreviousPage,
  rowActions,
  className,
  children,
}: DataProps<TData>) => {
  const [globalFilter, setGlobalFilter] = React.useState<string>("")

  const DEFAULT_PAGE_SIZE = 12
  const NUMBER_OF_ROWS = isPaginated
    ? pageSize
      ? pageSize
      : DEFAULT_PAGE_SIZE
    : data?.length ?? DEFAULT_PAGE_SIZE

  const table = useReactTable({
    columns,
    data: data ?? [],
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: isPaginated ? getPaginationRowModel() : undefined,
    getFilteredRowModel: isSearchable ? getFilteredRowModel() : undefined,
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: isSearchable ? fuzzyFilter : undefined,
    state: {
      globalFilter: globalFilter,
    },
  })

  return (
    <DataTableContext.Provider
      value={{
        table,
        rowActions,
        numberOfRows: NUMBER_OF_ROWS,
        isSearchable: isSearchable,
        searchPlaceholder: searchPlaceholder,
        globalFilter: globalFilter,
        onGlobalFilterChange: setGlobalFilter,
        isSelectable: isSelectable,
        onSelectionChange: onSelectionChange,
        isLoading: isLoading,
      }}
    >
      {children}
    </DataTableContext.Provider>
  )
}

type ViewProps = React.ComponentProps<"div">

const View = ({ className, style, ...props }: ViewProps) => {
  const { table, numberOfRows, rowActions, isSelectable, isLoading } =
    useDataTable()

  const ROW_HEIGHT = 48

  return (
    <div
      className={clx("relative w-full", className)}
      style={{
        height: `calc(${ROW_HEIGHT}px * ${numberOfRows} + ${ROW_HEIGHT}px)`, // Prevent layout shifts when number of rows changes, by setting a fixed height based on the number of rows plus the header row
        ...style,
      }}
      {...props}
    >
      {isLoading && (
        <div className="absolute inset-x-0 bottom-0 top-[49px] z-50 flex items-center justify-center">
          <Spinner className="animate-spin" />
        </div>
      )}
      <Table>
        <Table.Header>
          {table.getHeaderGroups().map((headerGroup) => (
            <Table.Row key={headerGroup.id}>
              <SelectHeaderCell
                table={table}
                isSelectable={isSelectable}
                isLoading={isLoading}
              />
              {headerGroup.headers.map((header) => (
                <Table.HeaderCell key={header.id} colSpan={header.colSpan}>
                  {header.isPlaceholder ? null : (
                    <div
                      className={clx("flex items-center gap-x-1", {
                        "cursor-pointer select-none":
                          header.column.getCanSort(),
                      })}
                      onClick={header.column.getToggleSortingHandler()}
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      {{
                        asc: <ChevronUpMini />,
                        desc: <ChevronDownMini />,
                      }[header.column.getIsSorted() as string] ?? null}
                    </div>
                  )}
                </Table.HeaderCell>
              ))}
              <ActionsHeaderCell rowActions={rowActions} />
            </Table.Row>
          ))}
        </Table.Header>
        <Table.Body>
          {table.getRowModel().rows.map((row) => (
            <Table.Row
              key={row.id}
              className={clx(
                "[&_td:last-child]:w-[1%] [&_td:last-child]:whitespace-nowrap",
                {
                  "bg-ui-bg-highlight hover:bg-ui-bg-highlight-hover":
                    row.getIsSelected(),
                }
              )}
            >
              <SelectCell row={row} isSelectable={isSelectable} />
              {row.getVisibleCells().map((cell) => {
                return (
                  <Table.Cell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </Table.Cell>
                )
              })}
              <ActionsCell row={row} rowActions={rowActions} />
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  )
}

const Menu = () => {}

const Title = () => {}

const SearchBar = () => {}

const Pagination = () => {}

const DT = Object.assign(Root, {
  View,
})

type SelectHeaderCellProps<TData> = {
  table: Primitive<TData>
  isSelectable: boolean
  isLoading?: boolean
}

const SelectHeaderCell = <TData,>({
  table,
  isSelectable,
  isLoading = false,
}: SelectHeaderCellProps<TData>) => {
  if (!isSelectable) {
    return null
  }

  return (
    <Table.HeaderCell className="w-[1%] whitespace-nowrap text-left">
      <Checkbox
        checked={
          table.getIsSomePageRowsSelected()
            ? "indeterminate"
            : table.getIsAllPageRowsSelected()
        }
        disabled={isLoading}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all rows on current page"
      />
    </Table.HeaderCell>
  )
}

type SelectCellProps<TData> = {
  row: Row<TData>
  isSelectable: boolean
}

const SelectCell = <TData,>({ row, isSelectable }: SelectCellProps<TData>) => {
  if (!isSelectable) {
    return null
  }

  return (
    <Table.Cell>
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    </Table.Cell>
  )
}

type ActionsHeaderCellProps<TData> = {
  rowActions?: RowAction<TData>[]
}

// We need to render an empty header cell, to mimick the default
// behaviour of react-table for columns with no header value.
const ActionsHeaderCell = <TData,>({
  rowActions,
}: ActionsHeaderCellProps<TData>) => {
  if (!rowActions || !rowActions.length) {
    return null
  }

  return <Table.HeaderCell />
}

type ActionsCellProps<TData> = {
  row: Row<TData>
  rowActions?: RowAction<TData>[]
}

const ActionsCell = <TData,>({ row, rowActions }: ActionsCellProps<TData>) => {
  if (!rowActions || !rowActions.length) {
    return null
  }

  return (
    <Table.Cell className="text-right">
      <DropdownMenu>
        <DropdownMenu.Trigger asChild>
          <Button variant={"transparent"} format={"icon"}>
            <span className="sr-only">Open actions menu</span>
            <EllipsisHorizontal />
          </Button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
          {rowActions.map((action, index) => {
            return (
              <DropdownMenu.Item
                key={index}
                className="gap-x-2"
                onClick={() => action.onClick({ row })}
              >
                {React.createElement(action.icon, {
                  className: "text-ui-fg-subtle",
                })}
                {action.label}
              </DropdownMenu.Item>
            )
          })}
        </DropdownMenu.Content>
      </DropdownMenu>
    </Table.Cell>
  )
}

export { DT, DataTable }

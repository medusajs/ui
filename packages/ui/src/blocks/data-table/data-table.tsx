import {
  ChevronDownMini,
  ChevronUpMini,
  EllipsisHorizontal,
} from "@medusajs/icons"
import {
  ColumnDef,
  Table as Primitive,
  Row,
  flexRender,
  getCoreRowModel,
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

type RowAction<TData> = {
  label: string
  icon: React.ComponentType<{ className?: string }>
  onClick: ({ row }: { row: Row<TData> }) => void
}

interface DataTableProps<TData> extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  columns: ColumnDef<TData>[]
  isSelectable?: boolean
  data?: TData[]
  rowActions?: RowAction<TData>[]
}

const DataTable = <TData,>({
  title,
  columns,
  data,
  rowActions,
  isSelectable = false,
  className,
  ...props
}: DataTableProps<TData>) => {
  // TODO - implement controlled sorting, pagination, selection, and filter state

  const table = useReactTable({
    columns,
    data: data ?? [],
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  })

  table.getPageCount()

  return (
    <div className={clx(className)} {...props}>
      <div className="px-8 pb-4 pt-6">
        <Heading level="h1">{title}</Heading>
      </div>
      <Table>
        <Table.Header>
          {table.getHeaderGroups().map((headerGroup) => (
            <Table.Row key={headerGroup.id}>
              <SelectHeaderCell table={table} isSelectable={isSelectable} />
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
              className={clx({
                "bg-ui-bg-highlight hover:bg-ui-bg-highlight-hover":
                  row.getIsSelected(),
              })}
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
    </div>
  )
}

type SelectHeaderCellProps<TData> = {
  table: Primitive<TData>
  isSelectable: boolean
}

const SelectHeaderCell = <TData,>({
  table,
  isSelectable,
}: SelectHeaderCellProps<TData>) => {
  if (!isSelectable) {
    return null
  }

  return (
    <Table.HeaderCell className="text-left">
      <Checkbox
        checked={
          table.getIsSomePageRowsSelected()
            ? "indeterminate"
            : table.getIsAllPageRowsSelected()
        }
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
    <Table.Cell>
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

export { DataTable }

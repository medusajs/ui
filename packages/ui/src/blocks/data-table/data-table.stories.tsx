import { PencilSquare, Plus, Trash } from "@medusajs/icons"
import type { Meta, StoryObj } from "@storybook/react"
import { ColumnDef } from "@tanstack/react-table"
import * as React from "react"

import { DataTable, DT } from "./data-table"

const columns: ColumnDef<Order>[] = [
  {
    accessorKey: "displayId",
    header: "#",
    cell: ({ row }) => (
      <div className="capitalize">#{row.getValue("displayId")}</div>
    ),
  },
  {
    accessorKey: "customer",
    header: "Customer",
    cell: ({ row }) => <div>{row.getValue("customer")}</div>,
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => <div className="lowercase">{row.getValue("email")}</div>,
  },
  {
    accessorKey: "amount",
    header: () => <div className="w-full text-right">Amount</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"))

      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: row.getValue("currency"),
      }).format(amount)

      return <div className="text-right font-medium">{formatted}</div>
    },
  },
  {
    accessorKey: "currency",
    header: () => null,
    cell: ({ row }) => (
      <div className="text-ui-fg-muted text-left">
        {row.getValue("currency")}
      </div>
    ),
  },
]

const Demo = (args: Parameters<typeof DataTable<Order>>[0]) => {
  const { orders } = useFakeOrders({
    limit: 15,
    offset: 0,
  })

  return (
    <div className="flex w-[80vw] items-center justify-center overflow-x-scroll p-4">
      <DT {...args} data={orders}>
        <DT.View className="w-full" />
      </DT>
    </div>
  )
}

const meta: Meta<typeof DataTable<Order>> = {
  title: "Blocks/Data Table",
  component: DataTable,
  args: {
    title: "Orders",
    columns,
  },
  parameters: {
    layout: "centered",
  },
  render: (args) => {
    return <Demo {...args} />
  },
}

export default meta

type Order = {
  id: string
  displayId: number
  customer: string
  email: string
  amount: number
  currency: string
}

type Story = StoryObj<typeof DataTable<Order>>

const firstNames = [
  "Charles",
  "Cooper",
  "Johhny",
  "Elvis",
  "John",
  "Jane",
  "Joe",
  "Jack",
  "Jill",
  "Jenny",
]
const lastNames = [
  "Brown",
  "Smith",
  "Johnson",
  "Williams",
  "Jones",
  "Miller",
  "Davis",
  "Garcia",
  "Rodriguez",
  "Wilson",
]
const currencies = ["USD", "EUR", "GBP", "JPY"]

function makeDate(x: number): Order[] {
  // get random name
  const getRandomName = () => {
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)]
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)]
    return `${firstName} ${lastName}`
  }

  const getRandomId = () => {
    return `order_${Math.floor(Math.random() * 100000)}`
  }

  const getRandomDisplayId = () => {
    return Math.floor(Math.random() * 100000)
  }

  const getRandomAmount = () => {
    return Math.floor(Math.random() * 1000)
  }

  const getRandomCurrency = () => {
    return currencies[Math.floor(Math.random() * currencies.length)]
  }

  const getRandomEmail = () => {
    return `${Math.floor(Math.random() * 100000)}@gmail.com`
  }

  // Create x random orders and resolve them after 1 second
  const orders = Array.from({ length: x }, () => ({
    id: getRandomId(),
    displayId: getRandomDisplayId(),
    customer: getRandomName(),
    email: getRandomEmail(),
    amount: getRandomAmount(),
    currency: getRandomCurrency(),
  }))

  return orders
}

type UseFakeOrdersProps = {
  limit: number
  offset: number
}

const useFakeOrders = ({ offset, limit }: UseFakeOrdersProps) => {
  const COUNT = 1000

  const [orders, setOrders] = React.useState<Order[]>(makeDate(limit))
  const [offsetState, setOffsetState] = React.useState<number | undefined>(0)
  const [isLoading, setIsLoading] = React.useState(false)

  // Fake API call
  React.useEffect(() => {
    const fetchOrders = async () => {
      setIsLoading(true)

      if (offset === offsetState) {
        return
      }

      await new Promise((resolve) => setTimeout(resolve, 1000))

      if (offset > COUNT) {
        return
      }

      const newOrders = makeDate(limit)

      setOrders([...orders, ...newOrders])

      setOffsetState(offset)

      setIsLoading(false)
    }

    fetchOrders()
  }, [offset, limit, orders, offsetState])

  return {
    orders,
    isLoading,
    count: COUNT,
  }
}

export const Default: Story = {}

export const Selectable: Story = {
  args: {
    isSelectable: true,
    isLoading: false,
  },
}

export const Searchable: Story = {
  args: {
    isSearchable: true,
  },
}

export const IsLoading = {
  args: {
    isLoading: true,
  },
}

export const RowActions: Story = {
  args: {
    rowActions: [
      {
        icon: Plus,
        label: "Add",
        onClick: ({ row }) => {
          alert(`Clicked "Add" on row #${row.original.id}`)
        },
      },
      {
        icon: PencilSquare,
        label: "Edit",
        onClick: ({ row }) => {
          alert(`Clicked "Edit" on row #${row.original.id}`)
        },
      },
      {
        icon: Trash,
        label: "Delete",
        onClick: ({ row }) => {
          alert(`Clicked "Delete" on row #${row.original.id}`)
        },
      },
    ],
  },
}

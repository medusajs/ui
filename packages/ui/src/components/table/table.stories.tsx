import type { Meta, StoryObj } from "@storybook/react"
import * as React from "react"

import { Table } from "./table"

const meta: Meta<typeof Table> = {
  title: "Components/Table",
  component: Table,
  parameters: {
    layout: "centered",
  },
}

export default meta

type Story = StoryObj<typeof Table>

export const Default: Story = {
  render: () => {
    return (
      <Table>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Header 1</Table.HeaderCell>
            <Table.HeaderCell>Header 2</Table.HeaderCell>
            <Table.HeaderCell>Header 3</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          <Table.Row>
            <Table.Cell>Cell 1</Table.Cell>
            <Table.Cell>Cell 2</Table.Cell>
            <Table.Cell>Cell 3</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Cell 4</Table.Cell>
            <Table.Cell>Cell 5</Table.Cell>
            <Table.Cell>Cell 6</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Cell 7</Table.Cell>
            <Table.Cell>Cell 8</Table.Cell>
            <Table.Cell>Cell 9</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    )
  },
}

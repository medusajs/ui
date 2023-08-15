"use client"

import { InformationCircleSolid } from "@medusajs/icons"
import { Container, Table, Tooltip } from "@medusajs/ui"
import { EnumType, PropData, PropDataMap } from "../types/api"

type PropsTableProps = {
  component: string
}

const mockData: PropDataMap = [
  {
    prop: "color",
    type: {
      type: "enum",
      values: ["grey", "green", "red", "orange", "blue", "purple"],
    },
    defaultValue: "grey",
  },
  {
    prop: "size",
    type: {
      type: "enum",
      values: ["small", "base", "large"],
    },
    defaultValue: "base",
  },
  {
    prop: "type",
    type: {
      type: "enum",
      values: ["default", "rounded", "icon"],
    },
    defaultValue: "default",
  },
  {
    prop: "hidden",
    type: "boolean",
    defaultValue: "false",
  },
]

const PropsTable = () => {
  return (
    <Container className="mb-6 mt-8 overflow-hidden p-0">
      <Table>
        <Table.Header className="border-t-0">
          <Table.Row>
            <Table.HeaderCell>Prop</Table.HeaderCell>
            <Table.HeaderCell>Type</Table.HeaderCell>
            <Table.HeaderCell className="text-right">Default</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {mockData.map((propData) => (
            <Row {...propData} />
          ))}
        </Table.Body>
      </Table>
    </Container>
  )
}

const Row = ({ prop, type, defaultValue }: PropData) => {
  const isEnum = (t: unknown): t is EnumType => {
    return (t as EnumType).type !== undefined && (t as EnumType).type === "enum"
  }

  return (
    <Table.Row className="[&:last-of-type]:border-b-0">
      <Table.Cell>{prop}</Table.Cell>
      <Table.Cell>
        {isEnum(type) ? (
          <Tooltip content={type.values.map((v) => `"${v}"`).join(" | ")}>
            <div className="flex items-center gap-x-1">
              <span className="txt-compact-small-plus">enum</span>
              <InformationCircleSolid className="text-ui-fg-subtle" />
            </div>
          </Tooltip>
        ) : (
          type.toString()
        )}
      </Table.Cell>
      <Table.Cell className="text-right">
        {defaultValue ? defaultValue : "-"}
      </Table.Cell>
    </Table.Row>
  )
}

export { PropsTable }

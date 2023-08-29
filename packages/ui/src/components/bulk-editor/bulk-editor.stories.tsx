import { faker } from "@faker-js/faker"
import type { Meta, StoryObj } from "@storybook/react"
import * as React from "react"

import { BulkEditor } from "./bulk-editor"

const meta: Meta<typeof BulkEditor> = {
  title: "Components/BulkEditor",
  component: BulkEditor,
  parameters: {
    layout: "fullscreen",
  },
}

export default meta

type Story = StoryObj<typeof BulkEditor>

type Price = {
  id: string
  currency: string
  amount: number
}

type Variant = {
  id: string
  title: string
  sku?: string
  prices: Price[]
}

type Product = {
  id: string
  title: string
  thumbnail: string
  variants: Variant[]
}

const createRandomProduct = (): Product => {
  return {
    id: faker.string.uuid(),
    title: faker.commerce.productName(),
    thumbnail: faker.image.url({
      width: 160,
      height: 220,
    }),
    variants: Array.from({
      length: faker.number.int({ min: 10, max: 50 }),
    }).map(() => {
      return {
        id: faker.string.uuid(),
        title: faker.commerce.productAdjective(),
        sku: faker.commerce.productMaterial(),
        prices: [
          {
            id: faker.string.uuid(),
            currency: "USD",
            amount: faker.number.int({ min: 100, max: 1000 }),
          },
          {
            id: faker.string.uuid(),
            currency: "EUR",
            amount: faker.number.int({ min: 100, max: 1000 }),
          },
        ],
      }
    }),
  }
}

const fakeData = Array.from({ length: 30 }).map(() => createRandomProduct())

export const Default: Story = {
  render: () => {
    return (
      <BulkEditor>
        <BulkEditor.Header lock>
          <BulkEditor.Row>
            <BulkEditor.HeaderCell>Product</BulkEditor.HeaderCell>
            <BulkEditor.HeaderCell>Price USD</BulkEditor.HeaderCell>
            <BulkEditor.HeaderCell>Price EUR</BulkEditor.HeaderCell>
          </BulkEditor.Row>
        </BulkEditor.Header>
        <BulkEditor.Body>
          {fakeData.map((product) => {
            return (
              <React.Fragment key={product.id}>
                <BulkEditor.Row key={product.id} isDecorative>
                  <BulkEditor.RowLabel>
                    <div className="flex items-center">
                      <img
                        src={product.thumbnail}
                        className="mr-3 h-[22px] w-4 rounded-[4px]"
                        alt=""
                      />
                      <span>{product.title}</span>
                    </div>
                  </BulkEditor.RowLabel>
                  <BulkEditor.Cell className="text-ui-fg-muted">
                    -
                  </BulkEditor.Cell>
                  <BulkEditor.Cell className="text-ui-fg-muted">
                    -
                  </BulkEditor.Cell>
                </BulkEditor.Row>
                {product.variants.map((variant) => {
                  return (
                    <BulkEditor.Row key={variant.id}>
                      <BulkEditor.RowLabel>
                        <div className="flex items-center">
                          <span>{variant.title}</span>
                        </div>
                      </BulkEditor.RowLabel>
                      <BulkEditor.Cell>
                        <BulkEditor.Input
                          type="number"
                          defaultValue={variant.prices[0].amount}
                        />
                      </BulkEditor.Cell>
                      <BulkEditor.Cell>
                        <BulkEditor.Input
                          type="number"
                          defaultValue={variant.prices[1].amount}
                        />
                      </BulkEditor.Cell>
                    </BulkEditor.Row>
                  )
                })}
              </React.Fragment>
            )
          })}
        </BulkEditor.Body>
      </BulkEditor>
    )
  },
}

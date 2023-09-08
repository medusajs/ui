import { faker } from "@faker-js/faker"
import type { Meta, StoryObj } from "@storybook/react"
import * as React from "react"

import { Spinner } from "@medusajs/icons"
import { Controller, useForm } from "react-hook-form"
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

type MoneyAmount = {
  id: string
  currency: string
  amount: number
  variant_id: string
}

const createRandomMoneyAmount = (): MoneyAmount[] => {
  const variantId = `variant_${faker.string.uuid()}`

  return [
    {
      id: `ma_${faker.string.uuid()}`,
      currency: "usd",
      amount: faker.number.int({ min: 100, max: 1000 }),
      variant_id: variantId,
    },
    {
      id: `ma_${faker.string.uuid()}`,
      currency: "eur",
      amount: faker.number.int({ min: 100, max: 1000 }),
      variant_id: variantId,
    },
  ]
}

type PriceList = {
  id: string
  name: string
  prices: MoneyAmount[]
}

const dbPrices = Array.from({ length: 500 })
  .map(() => createRandomMoneyAmount())
  .flat()

const usedVariantIds = new Set<string>()

const dbProducts = Array.from({ length: 10 }).map(() => {
  return {
    id: faker.string.uuid(),
    title: faker.commerce.productName(),
    thumbnail: faker.image.url({
      width: 160,
      height: 220,
    }),
    variants: Array.from({
      length: 5,
    }).map(() => {
      let variantId =
        dbPrices[faker.number.int({ min: 0, max: dbPrices.length - 1 })]
          .variant_id

      while (usedVariantIds.has(variantId)) {
        variantId =
          dbPrices[faker.number.int({ min: 0, max: dbPrices.length - 1 })]
            .variant_id
      }

      usedVariantIds.add(variantId)

      return {
        id: variantId,
        title: faker.commerce.productAdjective(),
        sku: faker.commerce.productMaterial(),
        prices: [
          {
            id: faker.string.uuid(),
            currency: "USD",
            amount: faker.number.int({ min: 1000, max: 100000 }),
            variant_id: variantId,
          },
          {
            id: faker.string.uuid(),
            currency: "EUR",
            amount: faker.number.int({ min: 1000, max: 100000 }),
            variant_id: variantId,
          },
        ],
      }
    }),
  }
})

const useFakePriceList = (id: string) => {
  const [isLoading, setIsLoading] = React.useState(false)
  const [priceList, setPriceList] = React.useState<PriceList | undefined>(
    undefined
  )

  React.useEffect(() => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      setPriceList({
        id,
        name: faker.commerce.productName(),
        prices: dbPrices,
      })
    }, 1000)
  }, [id])

  return {
    price_list: priceList,
    isLoading,
  }
}

const useFakeProducts = ({
  offset,
  limit,
}: {
  offset: number
  limit: number
}) => {
  const [isLoading, setIsLoading] = React.useState(false)
  const [products, setProducts] = React.useState<Product[]>([])
  const [count, setCount] = React.useState<number | undefined>(undefined)

  React.useEffect(() => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      setProducts(dbProducts.slice(offset, offset + limit))
      setCount(dbProducts.length)
    }, 1000)
  }, [offset, limit])

  return {
    products,
    isLoading,
    count,
  }
}

const BulkEditorDemo = () => {
  const form = useForm()

  const getValues = () => {
    console.log(form.getValues())
  }

  const [pageIndex, setPageIndex] = React.useState(0)
  const pageSize = 20

  const { price_list, isLoading: isPriceListLoading } = useFakePriceList("pl_1")

  const {
    products,
    isLoading: isProductsLoading,
    count,
  } = useFakeProducts({
    offset: pageIndex * pageSize,
    limit: pageSize,
  })

  const isLoading = isPriceListLoading || isProductsLoading

  const data = React.useMemo(() => {
    if (!products || !price_list) {
      return []
    }

    return products.map((product) => {
      return {
        id: product.id,
        title: product.title,
        thumbnail: product.thumbnail,
        variants: product.variants.map((variant) => {
          return {
            id: variant.id,
            title: variant.title,
            sku: variant.sku,
            prices: price_list?.prices.filter(
              (price) => price.variant_id === variant.id
            ),
          }
        }),
      }
    })
  }, [products, price_list])

  const pageCount = Math.ceil((count || 0) / pageSize)

  const canNextPage = pageIndex < pageCount - 1 && !isLoading
  const canPreviousPage = pageIndex > 0 && !isLoading

  const nextPage = () => {
    if (canNextPage) {
      setPageIndex(pageIndex + 1)
    }
  }

  const previousPage = () => {
    if (canPreviousPage) {
      setPageIndex(pageIndex - 1)
    }
  }

  return (
    <div>
      <button onClick={getValues}>Log values</button>
      <div className="relative">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <Spinner className="animate-spin" />
          </div>
        )}
        <BulkEditor>
          <BulkEditor.Header lock>
            <BulkEditor.Row>
              <BulkEditor.HeaderCell name="Product" canHide={false}>
                Product
              </BulkEditor.HeaderCell>
              <BulkEditor.HeaderCell name="Price USD">
                Price USD
              </BulkEditor.HeaderCell>
              <BulkEditor.HeaderCell name="Price EUR">
                Price EUR
              </BulkEditor.HeaderCell>
            </BulkEditor.Row>
          </BulkEditor.Header>
          <BulkEditor.Body>
            {data.map((product) => {
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
                    <BulkEditor.Cell className="text-ui-fg-muted text-right">
                      -
                    </BulkEditor.Cell>
                    <BulkEditor.Cell className="text-ui-fg-muted text-right">
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
                        {variant.prices?.map((price) => {
                          return (
                            <BulkEditor.Cell key={price.id}>
                              <Controller
                                control={form.control}
                                name={`${price.variant_id}-${price.currency}`}
                                defaultValue={price.amount}
                                render={({ field }) => {
                                  return (
                                    <BulkEditor.MoneyInput
                                      ref={field.ref}
                                      value={field.value}
                                      onChange={(e) => {
                                        console.log(
                                          `onChange fired for ${price.variant_id}-${price.currency}`,
                                          e.target.value
                                        )

                                        field.onChange(e)
                                      }}
                                      onBlur={field.onBlur}
                                      name={field.name}
                                      decimalDigits={2}
                                      prefix={
                                        price.currency === "usd" ? "$" : "€"
                                      }
                                    />
                                  )
                                }}
                              />
                            </BulkEditor.Cell>
                          )
                        })}
                      </BulkEditor.Row>
                    )
                  })}
                </React.Fragment>
              )
            })}
          </BulkEditor.Body>
        </BulkEditor>
      </div>
      <BulkEditor.Pagination
        pageCount={pageCount}
        canNextPage={canNextPage}
        canPreviousPage={canPreviousPage}
        count={count ?? 0}
        pageSize={pageSize}
        pageIndex={pageIndex}
        nextPage={nextPage}
        previousPage={previousPage}
      />
    </div>
  )
}

export const Default: Story = {
  render: () => {
    return <BulkEditorDemo />
  },
}

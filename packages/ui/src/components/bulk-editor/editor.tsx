import * as React from "react"

import { BuildingTax } from "@medusajs/icons"
import { BulkEditor } from "./bulk-editor"

type PriceEntry = {
  id: string
  variant_id: string
  amount: number
  min_quantity: number
  max_quantity: number
  currency_code?: string
  region_id?: string
}

type VariantEntry = {
  id: string
  title: string
  prices: PriceEntry[]
}

type ProductEntry = {
  id: string
  title: string
  thumbnail: string | null
  variants: VariantEntry[]
}

type CurrencyEntry = {
  id: string
  code: string
  name: string
  symbol: string
  is_tax_included: boolean
}

type RegionEntry = {
  id: string
  name: string
  currency_code: string
  currency_symbol: string
  is_tax_included: boolean
}

type EditorProps = {
  products: ProductEntry[]
  currencies: CurrencyEntry[]
  regions: RegionEntry[]
}

const Editor = ({ products, currencies, regions }: EditorProps) => {
  return (
    <div>
      <BulkEditor>
        <BulkEditor.Header lock>
          <BulkEditor.HeaderCell name="Product">Product</BulkEditor.HeaderCell>
          {currencies.map((currency) => {
            return (
              <React.Fragment key={currency.id}>
                <BulkEditor.HeaderCell name={`Price ${currency.name}`}>
                  <div className="flex w-full items-center justify-between">
                    <span>
                      Price {currency.name} ({currency.code})
                    </span>
                    {currency.is_tax_included ? (
                      <BuildingTax className="text-ui-fg-muted" />
                    ) : null}
                  </div>
                </BulkEditor.HeaderCell>
                <BulkEditor.HeaderCell name={`Min. ${currency.name}`}>
                  Min. {currency.name}
                </BulkEditor.HeaderCell>
                <BulkEditor.HeaderCell name={`Max. ${currency.name}`}>
                  Max. {currency.name}
                </BulkEditor.HeaderCell>
              </React.Fragment>
            )
          })}
          {regions.map((region) => {
            return (
              <React.Fragment key={region.id}>
                <BulkEditor.HeaderCell
                  name={`Price ${region.name} (${region.currency_code})`}
                >
                  <div className="flex w-full items-center justify-between">
                    <span>
                      Price {region.name} ({region.currency_code})
                    </span>
                    {region.is_tax_included ? (
                      <BuildingTax className="text-ui-fg-muted" />
                    ) : null}
                  </div>
                </BulkEditor.HeaderCell>
                <BulkEditor.HeaderCell name={`Min. ${region.name}`}>
                  Min. {region.name}
                </BulkEditor.HeaderCell>
                <BulkEditor.HeaderCell name={`Max. ${region.name}`}>
                  Max. {region.name}
                </BulkEditor.HeaderCell>
              </React.Fragment>
            )
          })}
        </BulkEditor.Header>
        <BulkEditor.Body>
          {products.map((product) => {
            return (
              <React.Fragment key={product.id}>
                <BulkEditor.Row isDecorative>
                  <BulkEditor.RowLabel>
                    <div className="flex items-center">
                      <div className="bg-ui-bg-subtle mr-3 h-[22px] w-4 overflow-hidden rounded-[4px]">
                        {product.thumbnail ? (
                          <img
                            src={product.thumbnail}
                            className="h-full w-full object-cover"
                            alt=""
                          />
                        ) : null}
                      </div>
                      <span>{product.title}</span>
                    </div>
                  </BulkEditor.RowLabel>
                  {currencies.map((currency) => {
                    return (
                      <React.Fragment key={currency.id}>
                        {Array.from({ length: 3 }).map((_, index) => {
                          return (
                            <BulkEditor.Cell
                              key={index}
                              className="text-ui-fg-muted text-right"
                            >
                              -
                            </BulkEditor.Cell>
                          )
                        })}
                      </React.Fragment>
                    )
                  })}
                  {regions.map((region) => {
                    return (
                      <React.Fragment key={region.id}>
                        {Array.from({ length: 3 }).map((_, index) => {
                          return (
                            <BulkEditor.Cell
                              key={index}
                              className="text-ui-fg-muted text-right"
                            >
                              -
                            </BulkEditor.Cell>
                          )
                        })}
                      </React.Fragment>
                    )
                  })}
                </BulkEditor.Row>
                {product.variants.map((variant) => {
                  return (
                    <BulkEditor.Row key={variant.id}>
                      <BulkEditor.RowLabel>
                        <div className="flex items-center">
                          <span>{variant.title}</span>
                        </div>
                      </BulkEditor.RowLabel>
                      {currencies.map((currency) => {
                        return (
                          <React.Fragment key={currency.id}>
                            {variant.prices?.map((price) => {
                              if (price.currency_code === currency.code) {
                                return (
                                  <React.Fragment key={price.id}>
                                    <BulkEditor.Cell>
                                      <BulkEditor.MoneyInput
                                        decimalDigits={2}
                                        prefix={currency.symbol}
                                      />
                                    </BulkEditor.Cell>
                                    <BulkEditor.Cell>
                                      <BulkEditor.Input />
                                    </BulkEditor.Cell>
                                    <BulkEditor.Cell>
                                      <BulkEditor.Input />
                                    </BulkEditor.Cell>
                                  </React.Fragment>
                                )
                              }
                            })}
                          </React.Fragment>
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
  )
}

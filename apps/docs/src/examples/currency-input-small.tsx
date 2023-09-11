import { CurrencyInput } from "@medusajs/ui"

export default function CurrencyInputDemo() {
  return (
    <div className="w-[250px]">
      <CurrencyInput size="small" symbol="$" code="usd" />
    </div>
  )
}

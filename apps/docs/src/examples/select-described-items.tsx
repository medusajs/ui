import { Label, Select } from "@medusajs/ui"

export default function SelectDescribedItems() {
  const currencies = [
    {
      value: "eur",
      label: "EUR",
      suffix: "Euro",
    },
    {
      value: "usd",
      label: "USD",
      suffix: "US Dollar",
    },
    {
      value: "dkk",
      label: "DKK",
      suffix: "Danish Krone",
    },
  ]

  const onChange = (value: any) =>
    console.log(
      `Currently selected: ${
        Array.isArray(value)
          ? `[${value.map((val) => val.value)}]`
          : value.value
      }`
    )

  return (
    <div className="w-[256px]">
      <Select onChange={onChange}>
        <Select.Trigger>
          <Select.Value placeholder="Select a currency ..." />
          <Select.TriggerIcon />
        </Select.Trigger>
        <Select.Content>
          {currencies.map((item) => (
            <Select.Item key={item.value} item={item}>
              {item.label}
              <Label className="text-ui-fg-muted ml-auto">{item.suffix}</Label>
            </Select.Item>
          ))}
        </Select.Content>
      </Select>
    </div>
  )
}

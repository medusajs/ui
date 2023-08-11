import { Select } from "@medusajs/ui"

export default function SelectGroupedItems() {
  const currencies = [
    {
      value: "eur",
      label: "EUR",
    },
    {
      value: "usd",
      label: "USD",
    },
    {
      value: "dkk",
      label: "DKK",
    },
  ]

  const regions = [
    { value: "na", label: "NA" },
    { value: "eu", label: "EU" },
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
          <Select.Label>Currencies</Select.Label>
          {currencies.map((item) => (
            <Select.Item key={item.value} item={item}>
              {item.label}
            </Select.Item>
          ))}
          <Select.Separator />
          <Select.Label>Regions</Select.Label>
          {regions.map((item) => (
            <Select.Item key={item.value} item={item}>
              {item.label}
            </Select.Item>
          ))}
        </Select.Content>
      </Select>
    </div>
  )
}

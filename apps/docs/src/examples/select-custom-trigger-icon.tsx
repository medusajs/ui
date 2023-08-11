import { ChevronDownMini } from "@medusajs/icons"
import { Select, clx, useSelectContext } from "@medusajs/ui"

export default function SelectCustomTriggerIcon() {
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

  const onChange = (value: any) =>
    console.log(
      `Currently selected: ${
        Array.isArray(value)
          ? `[${value.map((val) => val.value)}]`
          : value.value
      }`
    )

  const CustomIcon = () => {
    const { isOpen } = useSelectContext()

    return (
      <ChevronDownMini
        className={clx("transition-all", { "rotate-180": isOpen })}
      />
    )
  }

  return (
    <div className="w-[256px]">
      <Select onChange={onChange}>
        <Select.Trigger>
          <Select.Value placeholder="Select a currency ..." />
          <Select.TriggerIcon>
            <CustomIcon />
          </Select.TriggerIcon>
        </Select.Trigger>
        <Select.Content>
          {currencies.map((item) => (
            <Select.Item key={item.value} item={item}>
              {item.label}
            </Select.Item>
          ))}
        </Select.Content>
      </Select>
    </div>
  )
}

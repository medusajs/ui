import * as React from "react"

type ChoiceboxContextValue =
  | {
      type: "radio"
      value?: string
      defaultValue?: string
      onChange?: (value: string) => void
    }
  | {
      type: "checkbox"
      value?: string[]
      defaultValue?: string[]
      onChange?: (value: string[]) => void
    }

type ChoiceboxRadioProps = {
  type: "radio"
  value?: string
  defaultValue?: string
  onChange?: (value: string) => void
}

type ChoiceboxCheckboxProps = {
  type: "checkbox"
  value?: string[]
  defaultValue?: string[]
  onChange?: (value: string[]) => void
}

type ChoiceboxDefaultProps = {
  type?: undefined
  value?: string
  defaultValue?: string
  onChange?: (value: string) => void
}

type ChoiceboxProps = Omit<
  React.HTMLAttributes<HTMLElement>,
  "onChange" | "value" | "defaultValue"
> &
  (ChoiceboxRadioProps | ChoiceboxCheckboxProps | ChoiceboxDefaultProps)

const isRadio = (props: ChoiceboxProps): props is ChoiceboxRadioProps => {
  return props.type === "radio" || props.type === undefined
}

const isCheckbox = (props: ChoiceboxProps): props is ChoiceboxCheckboxProps => {
  return props.type === "checkbox"
}

const Root: React.FC<ChoiceboxProps> = (props) => {
  if (isRadio(props)) {
    return <RadioImpl {...props} />
  }

  if (isCheckbox(props)) {
    return <CheckboxImpl {...props} />
  }
}
Root.displayName = "ChoiceBox"

const RadioImpl: React.FC<ChoiceboxRadioProps> = ({}) => {
  return <div></div>
}

const CheckboxImpl: React.FC<ChoiceboxCheckboxProps> = ({}) => {
  return <div></div>
}

interface ItemProps extends React.ComponentPropsWithoutRef<"div"> {
  value: string
  label: string
  description?: string
}

const Item = React.forwardRef<HTMLDivElement, ItemProps>(() => {
  return <div></div>
})
Item.displayName = "Choicebox.Item"

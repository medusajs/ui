import * as React from "react"
import { DropdownMenu } from "@/components/dropdown-menu"

import { clx } from "@/utils/clx"
import {
  CheckMini,
  ChevronUpDown,
  EllipseMiniSolid,
  MagnifyingGlassMini,
  XMarkMini,
} from "@medusajs/icons"

import {
  UseComboboxProps,
  UseComboboxReturnValue,
  UseComboboxState,
  UseComboboxStateChange,
  UseComboboxStateChangeOptions,
  useCombobox,
} from "downshift"
import { Badge } from "../badge"
import { labelVariants } from "../label"

type SelectState<T> = {
  multi: boolean
  selectedItems?: SelectItem[]
  clearSelectedItems: () => void
  selectAll: () => void
  allSelected: boolean
  search: boolean
} & Partial<UseComboboxReturnValue<T>>

export type SelectItem = {
  value: any
  label: string
  [k: string]: any
}

export type SelectProps = {
  items: SelectItem[]
  multi?: boolean
  search?: boolean
  onChange: (value: SelectItem | SelectItem[]) => void
} & React.ComponentPropsWithoutRef<typeof DropdownMenu>

export const SelectContext = React.createContext<SelectState<SelectItem>>({
  multi: false,
  clearSelectedItems: () => {},
  selectAll: () => {},
  allSelected: false,
  search: false,
})

export const useSelectContext = () => {
  const context = React.useContext(SelectContext)
  if (context === null)
    throw new Error(
      "useSelectContext must be used within a Select.Root or SelectContext Provider"
    )

  return context
}

const multiStateReducer = (
  state: UseComboboxState<SelectItem>,
  actionAndChanges: UseComboboxStateChangeOptions<SelectItem>
) => {
  const { changes, type } = actionAndChanges

  switch (type) {
    case useCombobox.stateChangeTypes.ItemClick:
      return {
        ...changes,
        isOpen: true,
        highlightedIndex: state.highlightedIndex,
      }
    default:
      return changes
  }
}

const Root = ({
  children,
  items,
  multi = false,
  onChange,
  search = false,
  ...props
}: SelectProps) => {
  const [selectedItems, setSelectedItems] = React.useState<SelectItem[]>([])
  const allSelected = selectedItems.length === items.length

  React.useEffect(() => {
    if (multi) onChange(selectedItems)
  }, [selectedItems, onChange, multi])

  const selectProps: UseComboboxProps<SelectItem> = {
    items,
    onSelectedItemChange: ({ selectedItem }) => {
      if (selectedItem) onChange(selectedItem)
    },
  }

  const onMultiSelectedItemChange = ({
    selectedItem,
  }: UseComboboxStateChange<SelectItem>) => {
    if (!selectedItem) return

    const index = selectedItems.indexOf(selectedItem as any)

    if (index > 0) {
      setSelectedItems([
        ...selectedItems.slice(0, index),
        ...selectedItems.slice(index + 1),
      ])
    } else if (index === 0) {
      setSelectedItems([...selectedItems.slice(1)])
    } else {
      setSelectedItems([...selectedItems, selectedItem as any])
    }
  }

  const clearSelectedItems = () => {
    setSelectedItems([])
  }

  const selectAll = allSelected
    ? () => {
        clearSelectedItems()
      }
    : () => {
        setSelectedItems(items)
      }

  if (multi) {
    selectProps.stateReducer = multiStateReducer
    selectProps.selectedItem = null
    selectProps.onSelectedItemChange = onMultiSelectedItemChange
  }

  const selectReturn = useCombobox(selectProps)

  return (
    <DropdownMenu {...props} modal={false}>
      <SelectContext.Provider
        value={{
          multi,
          selectedItems,
          clearSelectedItems,
          selectAll,
          allSelected,
          search,
          ...selectReturn,
        }}
      >
        {children}
      </SelectContext.Provider>
    </DropdownMenu>
  )
}

Root.displayName = "Select.Root"

type TriggerProps = {
  size?: "small" | "regular"
}

const Trigger = React.forwardRef<
  React.ElementRef<typeof DropdownMenu.Trigger>,
  React.ComponentPropsWithoutRef<typeof DropdownMenu.Trigger> & TriggerProps
>(({ className, children, size = "regular", disabled, ...props }, ref) => {
  const { getToggleButtonProps, selectedItem, search } = useSelectContext()

  return (
    <DropdownMenu.Trigger
      asChild
      className={clx(
        "bg-ui-bg-subtle border-ui-border-loud-muted text-ui-fg-base shadow-buttons-secondary text-regular group/trigger relative z-10 flex h-10 w-full cursor-pointer items-center rounded-md border px-3 py-[9px] transition-all",
        "hover:bg-ui-bg-subtle-hover",
        {
          "focus:border-ui-fg-interactive focus:shadow-borders-active focus:outline-none":
            !disabled,
        },
        "data-[placeholder=true]:text-ui-fg-muted",
        "data-[state=open]:border-ui-fg-interactive data-[state=open]:shadow-borders-active",
        "data-[disabled]:bg-ui-bg-disabled data-[disabled]:text-ui-fg-disabled data-[placeholder]:data-[disabled]:text-ui-fg-disabled data-[disabled]:cursor-not-allowed",
        { "h-8 px-2 py-2": size === "small" },
        { "pl-10": search },
        className
      )}
      data-placeholder={!selectedItem}
      disabled={disabled}
      {...props}
      {...(getToggleButtonProps ? getToggleButtonProps() : {})}
    >
      <div>
        {search && (
          <div className="text-ui-fg-muted absolute left-3 flex h-5 w-5 items-center justify-center">
            {<MagnifyingGlassMini />}
          </div>
        )}
        {children}
      </div>
    </DropdownMenu.Trigger>
  )
})

Trigger.displayName = "Select.Trigger"

const TriggerIcon = ({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={clx(
      "text-ui-fg-muted group-data-[disabled]/trigger:text-ui-fg-disabled z-10 ml-auto",
      className
    )}
    {...props}
  >
    {children ? children : <ChevronUpDown />}
  </div>
)

TriggerIcon.displayName = "Select.TriggerIcon"

type ValueProps = {
  placeholder?: string
  value?: string
} & React.HTMLAttributes<HTMLDivElement>

const Value = ({ children, placeholder = "", value }: ValueProps) => {
  const {
    selectedItem,
    multi,
    selectedItems,
    clearSelectedItems,
    search,
    isOpen,
  } = useSelectContext()

  if (search && isOpen) return <SearchInput />

  // If children are a complex element, render them directly
  if (children && typeof children !== "string") return <div>{children}</div>

  // If there's a truthy value prop, render it
  if (value) return <div>{value}</div>

  // If neither a single item nor multiple items are selected, render placeholder
  if (!selectedItem && !selectedItems?.length) return <div>{placeholder}</div>

  // If we're in a multi select and have some selected items
  if (multi && selectedItems)
    return (
      <div className="text-ui-fg-base">
        <Badge
          className="relative z-20 mr-1"
          onClick={() => clearSelectedItems()}
        >
          {selectedItems.length} <XMarkMini />
        </Badge>
        Selected
      </div>
    )

  // Else just render the label on the selected item
  return <div>{selectedItem!.label}</div>
}

const Content = ({
  children,
  className,
  position = "popper",
  ...props
}: {
  children: any
  position?: string
  className?: string
}) => {
  const { getMenuProps } = useSelectContext()
  return (
    <DropdownMenu.Content
      className={clx(
        "bg-ui-bg-base shadow-elevation-flyout relative z-50 w-full min-w-[8rem] overflow-hidden rounded-lg",
        "data-[state=open]:animate-in data-[state=open]:fade-in-0",
        "data-[state=closed]:animate-out data-[state=closed]:fade-out-0",
        {
          "data-[side=bottom]:translate-y-2 data-[side=left]:-translate-x-2 data-[side=right]:translate-x-2 data-[side=top]:-translate-y-2":
            position === "popper",
          "w-full min-w-[var(--radix-dropdown-menu-trigger-width)]":
            position === "popper",
        },
        className
      )}
      {...props}
      {...(getMenuProps ? getMenuProps() : {})}
    >
      {children}
    </DropdownMenu.Content>
  )
}

type ItemProps = { item: SelectItem } & React.ComponentPropsWithoutRef<
  typeof DropdownMenu.Item
>

const Item = React.forwardRef<
  React.ElementRef<typeof DropdownMenu.Item>,
  ItemProps
>(({ className, children, item, ...props }, ref) => {
  const { getItemProps, selectedItem, selectItem, multi, selectedItems } =
    useSelectContext()
  const isSelected = selectedItem === item || selectedItems?.includes(item)
  return (
    <DropdownMenu.Item
      className={clx(
        "relative flex w-full cursor-default select-none items-center rounded-md py-2 pl-10 pr-3 text-sm",
        "hover:bg-ui-bg-base-hover",
        "focus:bg-ui-bg-base-hover focus:outline-none",
        "data-[disabled]:text-ui-fg-disabled data-[disabled]:cursor-not-allowed data-[disabled]:hover:bg-transparent",
        { "font-medium": isSelected },
        className
      )}
      {...props}
      {...(getItemProps ? getItemProps({ item }) : {})}
      onClick={(e) => {
        if (multi) e.preventDefault()
        if (selectItem) selectItem(item)
        getItemProps!({ item }).onClick!(e)
      }}
      // These need to be prevented else Radix triggers focus on the item, which blurs the search input
      onPointerMove={(e) => e.preventDefault()}
      onPointerLeave={(e) => e.preventDefault()}
    >
      {isSelected && (
        <div className="absolute left-3 flex h-5 w-5 items-center justify-center">
          {multi ? <CheckMini /> : <EllipseMiniSolid />}
        </div>
      )}
      {children}
    </DropdownMenu.Item>
  )
})

Item.displayName = "Select.Item"

const Separator = React.forwardRef<
  React.ElementRef<typeof DropdownMenu.Separator>,
  React.ComponentPropsWithoutRef<typeof DropdownMenu.Separator>
>(({ className, ...props }, ref) => (
  <DropdownMenu.Separator
    ref={ref}
    className={clx("bg-ui-border-base -mx-1 my-1 h-px", className)}
    {...props}
  />
))
Separator.displayName = "Select.Separator"

const SelectAll = ({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  const { multi, selectAll, allSelected } = useSelectContext()
  if (!multi) {
    console.error(
      'Select.SelectAll can only be used within a Select with multi="true"'
    )
    return null
  }
  return (
    <div
      className={clx(
        "relative flex w-full cursor-default select-none items-center rounded-md py-2 pl-10 pr-3 text-sm",
        "hover:bg-ui-bg-base-hover",
        "focus:outline-none",
        className
      )}
      onClick={(e) => {
        e.preventDefault()
        selectAll()
      }}
      // Prevent this, else the search input becomes unfocused
      onMouseDown={(e) => e.preventDefault()}
      {...props}
    >
      {allSelected && (
        <div className="absolute left-3 flex h-5 w-5 items-center justify-center">
          <EllipseMiniSolid />
        </div>
      )}
      {children ? children : "All"}
    </div>
  )
}
SelectAll.displayName = "Select.SelectAll"

const SearchInput = React.forwardRef<
  HTMLInputElement,
  React.ComponentPropsWithoutRef<"input">
>(({ className, ...props }, ref) => (
  <input
    ref={ref}
    className={clx(
      "caret-ui-fg-base text-regular text-ui-fg-base bg-transparent focus:outline-none",
      className
    )}
    placeholder="Find something"
    // Stop this else downshift focuses first matching element, for a11y
    onKeyDown={(e) => e.stopPropagation()}
    // Prevented else Radix closes the menu when this gains focus
    onFocus={(e) => e.stopPropagation()}
    autoFocus={true}
    {...props}
  />
))

SearchInput.displayName = "Select.SearchInput"

interface InputProps extends React.ComponentPropsWithoutRef<"input"> {
  icon?: React.ReactNode
}

const Search = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, icon, ...props }, ref) => {
    return (
      <div className="text-regular relative flex items-center px-3 py-2 pl-10">
        <div className="text-ui-fg-muted absolute left-3 flex h-5 w-5 items-center justify-center">
          {icon ? icon : <MagnifyingGlassMini />}
        </div>
        <SearchInput {...props} ref={ref} />
      </div>
    )
  }
)
Search.displayName = "Select.Search"

const Label = React.forwardRef<
  React.ElementRef<typeof DropdownMenu.Label>,
  React.ComponentPropsWithoutRef<typeof DropdownMenu.Label>
>(({ className, ...props }, ref) => (
  <DropdownMenu.Label
    ref={ref}
    className={clx(
      "text-ui-fg-subtle px-2 py-1.5",
      labelVariants({ size: "xsmall", weight: "plus" }),
      className
    )}
    {...props}
  />
))
Label.displayName = "Select.Label"

const Select = Object.assign(Root, {
  Trigger,
  TriggerIcon,
  Value,
  Content,
  Item,
  Separator,
  SelectAll,
  Search,
  Label,
})

export { Select }

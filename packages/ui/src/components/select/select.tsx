"use client"

import {
  CheckMini,
  ChevronUpDown,
  EllipseMiniSolid,
  MagnifyingGlassMini,
  XMarkMini,
} from "@medusajs/icons"
import * as DropdownPrimitive from "@radix-ui/react-dropdown-menu"
import {
  UseSelectProps,
  UseSelectReturnValue,
  UseSelectState,
  UseSelectStateChange,
  UseSelectStateChangeOptions,
  useSelect,
} from "downshift"
import { isEqual, throttle } from "lodash"
import * as React from "react"

import { Badge } from "@/components/badge"
import { clx } from "@/utils/clx"

const ALLOWED_SEARCH_KEYDOWN_CODES = ["Enter", "Escape", "ArrowUp", "ArrowDown"]
const SCROLL_TOLERANCE = 30

type SelectState<T> = {
  multi: boolean
  selectedItems?: T[]
  clearSelectedItems: () => void
  selectAll: () => void
  allSelected: boolean
  search: boolean
  onSearch: (searchTerm: string) => void
  addItem: (item: T) => void
  removeItem: (item: T) => void
  onScrollToBottom: () => void
} & UseSelectReturnValue<T>

export type SelectItem = {
  value: any
  label: string
  [k: string]: any
}

interface OnSelectChange {
  (value: SelectItem): void
  (value: SelectItem[]): void
}

export type SelectProps = {
  multi?: boolean
  search?: boolean
  onChange: OnSelectChange
  onSearch?: (searchTerm: string) => void
  onScrollToBottom?: () => void
} & React.ComponentPropsWithoutRef<typeof DropdownPrimitive.Root>

export const SelectContext =
  React.createContext<SelectState<SelectItem> | null>(null)

export const useSelectContext = () => {
  const context = React.useContext(SelectContext)
  if (context === null)
    throw new Error(
      "useSelectContext must be used within a Select.Root or SelectContext Provider"
    )

  return context
}

const multiStateReducer = (
  state: UseSelectState<SelectItem>,
  actionAndChanges: UseSelectStateChangeOptions<SelectItem>
) => {
  const { changes, type } = actionAndChanges

  switch (type) {
    case useSelect.stateChangeTypes.ItemClick:
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
  multi = false,
  onChange,
  search = false,
  onSearch = () => {},
  onScrollToBottom = () => {},
  ...props
}: SelectProps) => {
  // All items. Inferred internally from Item
  const [items, setItems] = React.useState<SelectItem[]>([])
  // Selected items, used for multiselects
  const [selectedItems, setSelectedItems] = React.useState<SelectItem[]>([])
  // Simple inferred state if all items are selected, used for SelectAll display logic
  const allSelected = selectedItems.length === items.length

  // Helpers for inferring all items for select
  const addItem = (item: SelectItem) => setItems((items) => [...items, item])
  const removeItem = (item: SelectItem) =>
    setItems((items) =>
      items.filter((existingItem) => !isEqual(existingItem, item))
    )

  // onChange trigger for multiselect contexts
  React.useEffect(() => {
    if (multi) onChange(selectedItems)
  }, [selectedItems, onChange, multi])

  // Simple props for combobox hook
  const selectProps: UseSelectProps<SelectItem> = {
    items,
    onSelectedItemChange: ({ selectedItem }) => {
      if (selectedItem) onChange(selectedItem)
    },
  }

  // Quick way to clear all multi-selected items. Used in trigger and by SelectAll
  const clearSelectedItems = () => {
    setSelectedItems([])
  }

  // action for SelectALl component or other custom impl.
  const selectAll = allSelected
    ? () => {
        clearSelectedItems()
      }
    : () => {
        setSelectedItems(items)
      }

  // Listener for when downshift's dropdown open state changes
  const onOpenChange = (open: boolean) => {
    // If the menu is closing, trigger a search clear.
    // The input clears on unmount, but any external filtering logic won't know that it should likely unfilter
    if (!open) onSearch("")
  }

  // Custom action when an item is selected in a multiselect context
  const onMultiSelectedItemChange = ({
    selectedItem,
  }: UseSelectStateChange<SelectItem>) => {
    if (!selectedItem) return

    const index = selectedItems.findIndex(
      (existingItem) => existingItem.value === selectedItem.value
    )

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

  // Change props for combobox hook if in multi context
  if (multi) {
    selectProps.stateReducer = multiStateReducer
    selectProps.selectedItem = null
    selectProps.onSelectedItemChange = onMultiSelectedItemChange
  }

  const selectReturn = useSelect(selectProps)

  return (
    <DropdownPrimitive.Root
      {...props}
      modal={false}
      onOpenChange={onOpenChange}
    >
      <SelectContext.Provider
        value={{
          multi,
          selectedItems,
          clearSelectedItems,
          selectAll,
          allSelected,
          search,
          onSearch,
          addItem,
          removeItem,
          onScrollToBottom: throttle(onScrollToBottom, 500),
          ...selectReturn,
        }}
      >
        {children}
      </SelectContext.Provider>
    </DropdownPrimitive.Root>
  )
}

Root.displayName = "Select.Root"

type TriggerProps = {
  size?: "small" | "regular"
}

const Trigger = React.forwardRef<
  React.ElementRef<typeof DropdownPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof DropdownPrimitive.Trigger> &
    TriggerProps
>(({ className, children, size = "regular", disabled, ...props }, ref) => {
  const { getToggleButtonProps, selectedItem, search } = useSelectContext()

  const { ref: toggleButtonRef, ...toggleButtonProps } = getToggleButtonProps({
    ref,
  })

  return (
    <DropdownPrimitive.Trigger
      ref={toggleButtonRef}
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
        { "h-8 px-2 py-2 text-sm": size === "small" },
        { "pl-10": search },
        className
      )}
      data-placeholder={!selectedItem}
      disabled={disabled}
      {...props}
      {...toggleButtonProps}
    >
      <div>
        {search && (
          <div className="text-ui-fg-muted absolute left-3 flex h-5 w-5 items-center justify-center">
            {<MagnifyingGlassMini />}
          </div>
        )}
        {children}
      </div>
    </DropdownPrimitive.Trigger>
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
    onSearch,
  } = useSelectContext()

  if (search && isOpen)
    return <SearchInput onChange={(e) => onSearch(e.target.value)} />

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

const Content = React.forwardRef<
  React.ElementRef<typeof DropdownPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DropdownPrimitive.Content>
>(({ children, className, ...props }, ref) => {
  const innerRef = React.useRef<HTMLDivElement | null>(null)
  const firstMount = React.useRef(true)

  React.useImperativeHandle<HTMLDivElement | null, HTMLDivElement | null>(
    ref,
    () => innerRef.current
  )

  const { getMenuProps, onScrollToBottom, isOpen } = useSelectContext()

  const { ref: menuRef, ...menuProps } = getMenuProps({ ref: innerRef })

  const handleScroll = React.useCallback(() => {
    if (innerRef.current) {
      const div = innerRef.current

      if (
        div.scrollHeight - div.scrollTop <=
        div.clientHeight + SCROLL_TOLERANCE
      ) {
        onScrollToBottom()
      }
    }
  }, [])

  React.useEffect(() => {
    if (innerRef.current) {
      innerRef.current.addEventListener("scroll", handleScroll)

      const isScrollable =
        innerRef.current.scrollHeight > innerRef.current.clientHeight
      if (!isScrollable && firstMount.current) {
        firstMount.current = false
        onScrollToBottom()
      }
    }
    return () => innerRef.current?.removeEventListener("scroll", handleScroll)
  }, [innerRef.current, handleScroll])

  return (
    <DropdownPrimitive.Content
      ref={menuRef}
      className={clx(
        "bg-ui-bg-base shadow-elevation-flyout relative z-50 w-full min-w-[8rem] overflow-auto rounded-lg",
        "data-[state=open]:animate-in data-[state=open]:fade-in-0",
        "data-[state=closed]:animate-out data-[state=closed]:fade-out-0",
        "data-[side=bottom]:translate-y-2 data-[side=left]:-translate-x-2 data-[side=right]:translate-x-2 data-[side=top]:-translate-y-2",
        "max-h-[200px] w-full min-w-[var(--radix-dropdown-menu-trigger-width)]",
        { hidden: !isOpen },
        className
      )}
      {...props}
      {...menuProps}
      forceMount={true}
      data-state={isOpen ? "open" : "closed"}
    >
      {children}
    </DropdownPrimitive.Content>
  )
})
Content.displayName = "Select.Content"

type ItemProps = { item: SelectItem } & React.ComponentPropsWithoutRef<
  typeof DropdownPrimitive.Item
>

const Item = React.forwardRef<
  React.ElementRef<typeof DropdownPrimitive.Item>,
  ItemProps
>(({ className, children, item, ...props }, ref) => {
  const {
    getItemProps,
    selectedItem,
    selectItem,
    multi,
    selectedItems,
    addItem,
    removeItem,
  } = useSelectContext()

  const { ref: itemRef, ...itemProps } = getItemProps({ item, ref })

  React.useEffect(() => {
    addItem(item)
    return () => removeItem(item)
  }, [item])

  const isSelected =
    selectedItem?.value === item.value ||
    !!selectedItems?.find((selectedItem) => selectedItem.value === item.value)

  return (
    <DropdownPrimitive.Item
      ref={itemRef}
      className={clx(
        "relative flex w-full cursor-default select-none items-center rounded-md py-2 pl-10 pr-3 text-sm",
        "hover:bg-ui-bg-base-hover",
        "focus:bg-ui-bg-base-hover focus:outline-none",
        "data-[disabled]:text-ui-fg-disabled data-[disabled]:cursor-not-allowed data-[disabled]:hover:bg-transparent",
        { "font-medium": isSelected },
        className
      )}
      {...props}
      {...itemProps}
      onClick={(e) => {
        if (multi) e.preventDefault()
        if (selectItem) selectItem(item)
        if (itemProps.onClick) itemProps.onClick(e)
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
    </DropdownPrimitive.Item>
  )
})

Item.displayName = "Select.Item"

const Separator = React.forwardRef<
  React.ElementRef<typeof DropdownPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof DropdownPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <DropdownPrimitive.Separator
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
>(({ className, ...props }, ref) => {
  const innerRef = React.useRef<HTMLInputElement>(null)

  React.useImperativeHandle<HTMLInputElement | null, HTMLInputElement | null>(
    ref,
    () => innerRef.current
  )

  return (
    <input
      ref={innerRef}
      className={clx(
        "caret-ui-fg-base text-regular text-ui-fg-base bg-transparent focus:outline-none",
        className
      )}
      placeholder="Find something"
      // Stop this else downshift focuses first matching element, for a11y
      onKeyDown={(e) => {
        if (!ALLOWED_SEARCH_KEYDOWN_CODES.includes(e.code)) {
          e.stopPropagation()
        }
        if (
          (e.code === "ArrowDown" || e.code === "ArrowUp") &&
          innerRef?.current
        )
          innerRef.current.blur()
      }}
      // Prevented else Radix closes the menu when this gains focus
      onFocus={(e) => e.stopPropagation()}
      autoFocus={true}
      {...props}
    />
  )
})

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
  React.ElementRef<typeof DropdownPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof DropdownPrimitive.Label>
>(({ className, ...props }, ref) => (
  <DropdownPrimitive.Label
    ref={ref}
    className={clx(
      "text-ui-fg-subtle txt-compact-xsmall-plus px-2 py-1.5",
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
  Label,
})

export { Select }

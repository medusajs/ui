# @medusajs/ui-preset

## 1.0.1

### Patch Changes

- ef98084: feat(ui,icons,ui-preset): Update to Medusa UI, including new components, icons, and preset styles.

  # Changes in `@medusajs/ui`

  ## New components

  - `IconButton` - A button that only contains an icon.
  - `IconBadge` - A badge that only contains an icon.
  - `StatusBadge` - A badge component specifically designed to be used for displaying statuses.
  - `Tabs` - A tab component that can be used to switch between different views.
  - `ProgressTabs` - A tab component specifically designed to be used for building multi-step tasks.
  - `ProgressAccordion` - An accordion component specifically designed to be used for building multi-step tasks.
  - `CurrencyInput` - An input component that can be used to input currency values.
  - `CommandBar` - A component that can be used to display a list of keyboard commands omn the screen.
  - `CurrencyInput` - An input component that can be used to input currency values, such as prices.

  ## Breaking changes

  Several components have been reorganized to streamline their API. The following components have breaking changes:

  - Button - The `format` property has been removed. To create a Icon only button, use the new `IconButton` component.
  - Badge - The `format` property has been removed. To create a Icon only badge, use the new `IconBadge` component. The border radius of the component is now controlled using the new `rounded` property.
  - CodeBlock - The `hideLineNumbers` property has been moved to the `snippets` property. This allows users to control the visibility of line numbers on a per snippet basis.

  ## Other changes

  - The `z-index`'s of all components have been cleaned up to to make stacking portalled components easier.
  - `Table.Pagination` has been tweaked to ensure that it displays the correct number of pages when there is no data.
  - `Calendar` has been tweaked to prevent clicking a date from submitting any forms that precede it in the DOM.

  # Changes in `@medusajs/icons`

  ## New icons

  - `X`
  - `AcademicCap`
  - `Figma`
  - `Photo`
  - `PuzzleSolid`
  - `Text`

  # Changes in `@medusajs/ui-preset`

  Minor tweaks to colors, typography, and animations.

## 1.0.0

### Major Changes

- 8d31ce6: Release of the Medusa UI design system, includes three new packages: `@medusajs/ui` a set of React components, hooks, and utils; `@medusajs/icons` a set of React icons; `@medusajs/ui-preset` a Tailwind CSS preset containing Medusa UI design tokens.

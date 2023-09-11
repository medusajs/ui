---
"@medusajs/ui": major
"@medusajs/icons": patch
---

feat(ui,icons): Update to Medusa UI, including new components and icons.

# Changes in `@medusajs/ui`

## New components

- `IconButton` - A button that only contains an icon.
- `IconBadge` - A badge that only contains an icon.
- `StatusBadge` - A badge component specifically designed to be used for displaying statuses.
- `Tabs` - A tab component that can be used to switch between different views.
- `ProgressTabs` - A tab component specifically designed to be used for building multi-step tasks.
- `CurrencyInput` - An input component that can be used to input currency values.

## Breaking changes

Several components have been reorganized to streamline their API. The following components have breaking changes:

- Button - The `format` property has been removed. To create a Icon only button, use the new `IconButton` component.
- Badge - The `format` property has been removed. To create a Icon only badge, use the new `IconBadge` component. The border radius of the component is now controlled using the new `rounded` property.
- CodeBlock - The `hideLineNumbers` property has been moved to the `snippets` property. This allows users to control the visibility of line numbers on a per snippet basis.

# Changes in `@medusajs/icons`

## New icons

- `X` - Logo of X (formerly known as Twitter).

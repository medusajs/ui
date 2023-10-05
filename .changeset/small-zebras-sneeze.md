---
"@medusajs/ui-preset": patch
"@medusajs/ui": minor
"@medusajs/icons": minor
---

feat(ui,ui-preset): Release 2.1.0

## `@medusajs/ui`

- The styling of buttons, inputs, and the CommandBar has been adjusted to have a more consistent look and feel.
- Fixed an issue that caused DropdownMenu.Content to overflow the viewport.
- Fixed an issue with the DatePicker component where deleting a time segment would throw an error.
- The Text component now accepts a `leading` prop to adjust the line height. It can be set to `normal` (default) or `compact`. This change in the API is fully backwards compatible.
- Adds a new subcomponent to RadioGroup called RadioGroup.ChoiceBox. This component wraps the RadioGroup.Item component with a mandatory label and description.

## `@medusajs/ui-preset`

- Updated several colors, shadows, and gradient effects.

## `@medusajs/icons`

- Introduces 6 new icons: QuestionMark, SparklesMiniSolid, SparklesMini, ThumbDown, ThumbUp, and UserCircleMini.
- There have been slight adjustments made to ArrowPathMini, EllipseBlueSolid, EllipseGreenSolid, EllipseGreySolid, EllipseOrangeSolid, EllipsePurpleSolid, and EllipseRedSolid.

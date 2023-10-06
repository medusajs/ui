---
"@medusajs/ui": minor
---

fix(ui): 2.2.0

# Changelog

## `@medusajs/ui`

This minor release contains a few bug fixes and improvements, as well as a new primitive component.

### Fixes

- Fixes an issue that was preventing the onChange event from firing for the `DatePicker` component when `showTimePicker` was false.
- Fixes an issue where the `DatePicker` component would fire the onChange event when clicking outside of the component. It now only fires the event when the "Apply" button is clicked.

### New Components

- Adds a new `Popover` component. This component is a primitive component that can be used to create popovers. It shares much of the same styling as the `DropdownMenu` component, and can be used as a replacement when building highly customized dropdowns where the `DropdownMenu` component is not flexible enough.

# Tooltip

Tooltips are desktop-only components that display additional information when hovering over or focusing on an element.

- **Keyboard Hover Support:** Tooltips should be accessible when an element is focused using the keyboard.
- **Dynamic Positioning:** Tooltip content should be displayed based on the current position of the trigger element on the screen and always visible to the user.
- **Hover Timeout:** Having a small timeout before triggering a tooltip will help to prevent occasionally showing tooltips while users move their mouse cursor.
- **Light Variant:** The tooltip should respect its parent element background and provide a variant to be used on darker background colours.
- **Instant Transition for Element Groups:** If there’s a group of elements using tooltips, hovering over another element while a tooltip’s already active shouldn’t trigger the animation.

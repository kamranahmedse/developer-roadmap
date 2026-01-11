# Focus Management

Focus management ensures keyboard users can navigate your interface logically. It's critical for modals, dynamic content, and single-page applications.

**Focus Indicators**:
- Never remove focus outlines without providing an alternative
- Use `:focus-visible` to show focus rings only for keyboard navigation
- Ensure 4.5:1 contrast ratio for focus indicators

**Focus Trapping**: Modal dialogs must trap focus—Tab should cycle through modal content, not escape to the page behind. Libraries like Radix handle this automatically.

**Focus Restoration**: When a modal closes, return focus to the element that opened it. Users shouldn't lose their place in the document.

**Managing Dynamic Content**:
- When new content appears, consider if focus should move to it
- Loading states shouldn't steal focus unexpectedly
- Deleted items should move focus to a logical next element

**Tab Order**: Focus order should match visual order (reading order). Use `tabindex="0"` to add elements to natural tab order, `tabindex="-1"` for programmatic focus only. Avoid `tabindex` > 0.

Visit the following resources to learn more:

- [@article@Focus Management - React](https://react.dev/reference/react-dom/components/common#managing-focus)
- [@article@Focus Visible - MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/:focus-visible)
- [@article@Keyboard Accessibility - WebAIM](https://webaim.org/techniques/keyboard/)
- [@video@Focus Management Tutorial](https://www.youtube.com/watch?v=uCIC2LNt0bk)

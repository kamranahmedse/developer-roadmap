# ARIA Patterns

ARIA (Accessible Rich Internet Applications) supplements HTML semantics for complex widgets that don't have native HTML equivalents. It's powerful but easy to misuse.

**First Rule of ARIA**: Don't use ARIA if native HTML works. `<button>` is better than `<div role="button">`.

**Common ARIA Attributes**:
- `role`: Defines what an element is (menu, dialog, tab)
- `aria-label`: Provides accessible name when text isn't visible
- `aria-labelledby`: References another element for the name
- `aria-describedby`: References additional description
- `aria-expanded`: Indicates expandable element state
- `aria-hidden`: Hides from assistive technology
- `aria-live`: Announces dynamic content changes

**Widget Patterns**: The WAI-ARIA Authoring Practices Guide provides patterns for:
- Modal dialogs
- Tabs
- Accordions
- Comboboxes/Autocomplete
- Menus and menubars
- Tree views

**Why Use Headless Libraries**: Libraries like Radix UI implement these complex patterns correctly. Unless you're deeply experienced with ARIA, prefer battle-tested components.

Visit the following resources to learn more:

- [@official@WAI-ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)
- [@article@ARIA - MDN](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA)
- [@article@No ARIA is Better Than Bad ARIA](https://www.w3.org/WAI/ARIA/apg/practices/read-me-first/)
- [@video@ARIA Explained](https://www.youtube.com/watch?v=0hqhAIjE_8I)

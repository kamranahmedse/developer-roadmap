# Radix UI Primitives

Radix UI provides unstyled, accessible React components (primitives) that handle the complex accessibility patterns for you. You add the styling; Radix handles ARIA, keyboard navigation, and focus management.

**Why Radix**:
- Battle-tested accessibility patterns
- Full keyboard navigation support
- Proper focus management
- Works with any styling solution
- Composable APIs using compound components

**Available Primitives**: Dialog, Dropdown Menu, Popover, Tooltip, Tabs, Accordion, Select, Checkbox, Radio Group, Toggle, Slider, and many more.

**Usage Pattern**:
```tsx
import * as Dialog from '@radix-ui/react-dialog';

<Dialog.Root>
  <Dialog.Trigger>Open</Dialog.Trigger>
  <Dialog.Portal>
    <Dialog.Overlay className="..." />
    <Dialog.Content className="...">
      <Dialog.Title>Title</Dialog.Title>
      <Dialog.Description>Description</Dialog.Description>
      <Dialog.Close>Close</Dialog.Close>
    </Dialog.Content>
  </Dialog.Portal>
</Dialog.Root>
```

**Styling**: Radix components are completely unstyled. Use Tailwind, CSS Modules, or any styling approach. shadcn/ui builds on Radix with Tailwind styling.

Visit the following resources to learn more:

- [@official@Radix UI Primitives](https://www.radix-ui.com/primitives)
- [@article@Why Radix](https://www.radix-ui.com/primitives/docs/overview/introduction)
- [@article@Radix Accessibility](https://www.radix-ui.com/primitives/docs/overview/accessibility)
- [@video@Radix UI Tutorial](https://www.youtube.com/watch?v=1nMi1Vx1190)

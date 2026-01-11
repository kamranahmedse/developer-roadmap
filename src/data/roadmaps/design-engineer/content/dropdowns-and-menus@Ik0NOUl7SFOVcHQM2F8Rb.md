# Dropdowns and Menus

Dropdowns and menus are deceptively complex components. Proper implementation requires careful attention to positioning, keyboard navigation, and focus management.

**Types**:
- **Dropdown Menu**: Actions list (edit, delete, share)
- **Select**: Single value selection from options
- **Combobox**: Searchable selection with autocomplete
- **Navigation Menu**: Site navigation with submenus

**Keyboard Navigation**:
- `Enter`/`Space`: Open menu, select item
- `Arrow Down/Up`: Navigate items
- `Escape`: Close menu
- `Home/End`: Jump to first/last item
- Type characters to jump to matching items

**Positioning Challenges**:
- Viewport collision detection
- Scroll handling
- Portal rendering for z-index isolation
- Maintaining position on scroll/resize

**Why Use Headless Libraries**:
Radix, Headless UI, and Ark UI handle:
- Complex keyboard interactions
- Screen reader announcements
- Focus management
- Positioning with Floating UI

**Styling Tips**:
- Clear hover/focus states
- Adequate touch targets (44px minimum)
- Visual grouping for related items
- Truncation for long text

Visit the following resources to learn more:

- [@official@Radix Dropdown Menu](https://www.radix-ui.com/primitives/docs/components/dropdown-menu)
- [@article@Menu Button - ARIA APG](https://www.w3.org/WAI/ARIA/apg/patterns/menu-button/)
- [@official@Floating UI](https://floating-ui.com/)
- [@video@Dropdown Menu Tutorial](https://www.youtube.com/watch?v=lY-RQjWeweo)

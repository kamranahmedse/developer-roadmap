# Color Token Systems

Color tokens transform raw color values into a systematic, themeable palette. A well-designed color token system enables dark mode, brand variants, and consistent color usage across an entire product.

**Primitive Colors**: Your raw palette. Often named by hue and lightness: blue-50 through blue-900, gray-50 through gray-900. Generate these with tools like Leonardo or manual curation.

**Semantic Colors**:
- `color-primary`: Brand primary action
- `color-secondary`: Secondary actions
- `color-success`: Positive feedback (green)
- `color-warning`: Caution states (yellow/orange)
- `color-error`: Negative feedback (red)
- `color-info`: Informational (blue)

**Surface and Text Colors**:
- `background-default`, `background-subtle`, `background-muted`
- `foreground-default`, `foreground-muted`, `foreground-subtle`

**Dark Mode**: Semantic tokens reference different primitives per theme. `background-default` might be gray-50 in light mode, gray-900 in dark mode.

**Accessibility**: Build contrast checking into your token system. Ensure text colors always have sufficient contrast against their backgrounds.

Visit the following resources to learn more:

- [@article@Color in Design Systems - Nathan Curtis](https://medium.com/eightshapes-llc/color-in-design-systems-a1c80f65fa3)
- [@article@Building Your Color Palette - Refactoring UI](https://www.refactoringui.com/previews/building-your-color-palette)
- [@opensource@Leonardo Color - Adobe](https://leonardocolor.io/)
- [@opensource@Radix Colors](https://www.radix-ui.com/colors)

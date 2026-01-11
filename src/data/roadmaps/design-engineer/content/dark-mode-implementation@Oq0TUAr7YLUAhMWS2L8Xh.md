# Dark Mode Implementation

Dark mode has become an expected feature. Implementing it properly demonstrates design system thinking and attention to user preferences—key Design Engineer skills.

**Implementation Approaches**:

**CSS Variables + Class Toggle**:
```css
:root { --bg: #ffffff; --text: #000000; }
.dark { --bg: #0a0a0a; --text: #ffffff; }
```

**Tailwind dark: Variant**:
```tsx
<div className="bg-white dark:bg-gray-900">
```

**Key Considerations**:

1. **System Preference**: Detect `prefers-color-scheme` media query
2. **Manual Toggle**: Let users override system preference
3. **Persistence**: Remember choice in localStorage
4. **Flash Prevention**: Avoid white flash on page load (use blocking script)

**Design Tokens**: Semantic color tokens make dark mode manageable. `background-default` references different primitives per theme.

**Common Mistakes**:
- Just inverting colors (pure white on black is harsh)
- Forgetting about images and shadows
- Not testing contrast in both modes
- Flash of wrong theme on load

**Testing**: Test both modes from day one. Retrofitting dark mode is painful.

Visit the following resources to learn more:

- [@article@Dark Mode - Tailwind](https://tailwindcss.com/docs/dark-mode)
- [@article@Perfect Dark Mode - Josh Comeau](https://www.joshwcomeau.com/react/dark-mode/)
- [@article@Dark Mode Guide - CSS-Tricks](https://css-tricks.com/a-complete-guide-to-dark-mode-on-the-web/)
- [@video@Dark Mode Implementation](https://www.youtube.com/watch?v=oMOe_32M6ss)

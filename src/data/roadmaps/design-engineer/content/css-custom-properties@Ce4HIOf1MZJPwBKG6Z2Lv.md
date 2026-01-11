# CSS Custom Properties

CSS Custom Properties (CSS Variables) are the foundation of modern theming and design token implementation. They enable dynamic, runtime-changeable values that cascade through your styles.

**Basic Syntax**:
```css
:root {
  --color-primary: #3b82f6;
  --spacing-md: 16px;
}

.button {
  background: var(--color-primary);
  padding: var(--spacing-md);
}
```

**Key Features**:
- **Cascade**: Variables inherit and can be overridden in nested scopes
- **Runtime Updates**: Can be changed via JavaScript
- **Fallbacks**: `var(--color, fallback-value)`
- **Calculations**: Use in `calc()` expressions

**Theming Pattern**:
```css
:root {
  --bg-default: #ffffff;
  --text-default: #000000;
}

.dark {
  --bg-default: #0a0a0a;
  --text-default: #ffffff;
}
```

**With Tailwind**: Define custom properties in your CSS, reference them in `tailwind.config.js` for the best of both worlds.

**Best Practices**:
- Use semantic names (--color-primary, not --blue)
- Define at `:root` for globals
- Override in component scopes when needed
- Combine with design tokens for systematic theming

Visit the following resources to learn more:

- [@article@CSS Custom Properties - MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties)
- [@article@Complete Guide to Custom Properties - CSS-Tricks](https://css-tricks.com/a-complete-guide-to-custom-properties/)
- [@video@CSS Variables - Kevin Powell](https://www.youtube.com/watch?v=NtRmIp4eMjs)

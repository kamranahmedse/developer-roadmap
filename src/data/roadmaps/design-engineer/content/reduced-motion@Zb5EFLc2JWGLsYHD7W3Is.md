# Reduced Motion Support

Some users experience motion sickness, vestibular disorders, or simply prefer less animation. The `prefers-reduced-motion` media query lets you respect these preferences.

**Detecting Preference**:
```css
@media (prefers-reduced-motion: reduce) {
  /* Simplified or removed animations */
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

**In JavaScript/React**:
```tsx
const prefersReducedMotion = window.matchMedia(
  '(prefers-reduced-motion: reduce)'
).matches;
```

**With Framer Motion**:
```tsx
<motion.div
  animate={{ x: 100 }}
  transition={{
    type: prefersReducedMotion ? 'tween' : 'spring',
    duration: prefersReducedMotion ? 0 : undefined
  }}
/>
```

**Best Practices**:
- Don't remove animations entirely—reduce them
- Maintain feedback (instant state changes are fine)
- Consider providing a manual toggle in addition to system preference
- Test your interface with reduced motion enabled

**What to Reduce**: Parallax, auto-playing animations, large movements, bouncy effects. Keep: instant feedback, subtle fades.

Visit the following resources to learn more:

- [@article@prefers-reduced-motion - MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion)
- [@article@Reduced Motion Best Practices - web.dev](https://web.dev/articles/prefers-reduced-motion)
- [@video@Accessible Animations](https://www.youtube.com/watch?v=hfqK3KX3U5w)

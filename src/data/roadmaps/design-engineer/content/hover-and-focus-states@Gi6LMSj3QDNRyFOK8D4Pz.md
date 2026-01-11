# Hover and Focus States

Interactive states—hover, focus, active, and disabled—are where Design Engineers demonstrate attention to detail. These micro-interactions make interfaces feel responsive and polished.

**Hover States**: Show that elements are interactive. Use subtle changes—slight color shift, gentle scale, shadow lift. Don't overdo it; the effect should enhance, not distract.

**Focus States**: Critical for keyboard navigation and accessibility. Focus rings must be visible (4.5:1 contrast minimum). Use `:focus-visible` to show focus only for keyboard users, not mouse clicks.

**Active States**: The pressed/clicked moment. Often slightly darker or "pushed in" feeling. Confirms the action is registering.

**Disabled States**: Lower opacity, removed cursor, no hover effects. Make it clear the element is not interactive, but keep it visible enough to understand what it is.

**Implementation Tips**:
- Layer states (hover + focus can combine)
- Use transitions for smooth state changes (150-200ms)
- Test with keyboard navigation
- Consider touch devices (no hover)

Visit the following resources to learn more:

- [@article@Designing Button States - Smashing](https://www.smashingmagazine.com/2019/02/buttons-interfaces/)
- [@article@Focus Visible Explained - MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/:focus-visible)
- [@article@Pseudo-classes - web.dev](https://web.dev/learn/css/pseudo-classes/)
- [@video@Interactive States Design](https://www.youtube.com/watch?v=0hqGS6gFZ-s)

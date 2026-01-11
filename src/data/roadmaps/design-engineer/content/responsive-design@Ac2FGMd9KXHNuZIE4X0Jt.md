# Responsive Design

Responsive design ensures interfaces work beautifully across all screen sizes. For Design Engineers, this means thinking beyond breakpoints to fluid, adaptive layouts.

**Mobile-First Approach**: Start with mobile styles, add complexity for larger screens using `min-width` media queries. This results in better mobile performance and cleaner progressive enhancement.

**Modern Techniques**:
- **Fluid typography**: `clamp()` for sizes that scale without breakpoints
- **Fluid spacing**: Viewport-relative units combined with clamp()
- **Intrinsic layouts**: CSS Grid `auto-fit`/`auto-fill` with `minmax()`
- **Container queries**: Style based on container size, not viewport

**Breakpoint Strategy**:
```css
/* Tailwind defaults: sm:640px, md:768px, lg:1024px, xl:1280px, 2xl:1536px */
/* Design for content, not devices */
```

**Testing**: Test on real devices when possible. Browser DevTools device mode is helpful but doesn't catch everything (touch behavior, performance).

**Common Mistakes**:
- Fixed widths that break on small screens
- Text too small on mobile
- Touch targets smaller than 44px
- Hiding too much content on mobile

Visit the following resources to learn more:

- [@article@Responsive Design - MDN](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Responsive_Design)
- [@article@Learn Responsive Design - web.dev](https://web.dev/learn/design/)
- [@course@Conquering Responsive Layouts - Kevin Powell](https://courses.kevinpowell.co/conquering-responsive-layouts)
- [@video@Responsive Design Tutorial](https://www.youtube.com/watch?v=srvUrASNj0s)

# Performance for Design Engineers

Performance directly impacts user experience. Slow interfaces feel broken regardless of visual polish. Design Engineers must understand performance fundamentals.

**Core Web Vitals**:
- **LCP (Largest Contentful Paint)**: < 2.5s - when main content loads
- **INP (Interaction to Next Paint)**: < 200ms - responsiveness
- **CLS (Cumulative Layout Shift)**: < 0.1 - visual stability

**Animation Performance**:
- Animate only `transform` and `opacity` (GPU-accelerated)
- Avoid animating layout properties (width, height, margin)
- Use `will-change` sparingly as optimization hint
- Test animations on lower-powered devices

**Image Optimization**:
- Use `next/image` or similar for automatic optimization
- Serve WebP/AVIF formats
- Implement lazy loading
- Specify dimensions to prevent layout shift

**JavaScript Performance**:
- Code split large bundles
- Lazy load below-fold content
- Memoize expensive calculations
- Avoid unnecessary re-renders in React

**Measurement**:
- Lighthouse in Chrome DevTools
- WebPageTest for detailed analysis
- Real User Monitoring (RUM) for production data

Visit the following resources to learn more:

- [@article@Core Web Vitals - web.dev](https://web.dev/articles/vitals)
- [@article@Rendering Performance - web.dev](https://web.dev/articles/rendering-performance)
- [@opensource@Lighthouse](https://developer.chrome.com/docs/lighthouse/overview/)
- [@video@Web Performance - Fireship](https://www.youtube.com/watch?v=0fONene3OIA)

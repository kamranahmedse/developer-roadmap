# SVG for Design Engineers

SVG (Scalable Vector Graphics) is essential for icons, illustrations, and complex animations. Unlike raster images, SVGs scale infinitely and can be styled and animated with CSS and JavaScript.

**Why SVG**:
- Infinitely scalable without quality loss
- Small file sizes for simple graphics
- Styleable with CSS (fill, stroke, colors)
- Animatable with CSS or JavaScript
- Accessible with proper markup

**Common Use Cases**:
- Icons (inline for styling flexibility)
- Logos and illustrations
- Animated graphics
- Data visualizations
- Decorative elements

**Working with SVG in React**:
```tsx
// Inline SVG for full control
<svg viewBox="0 0 24 24" className="w-6 h-6 text-current">
  <path fill="currentColor" d="..." />
</svg>

// Or use icon libraries
import { Icon } from 'lucide-react';
```

**Icon Libraries**: Heroicons, Lucide, Phosphor Icons provide consistent, well-designed icon sets optimized for web use.

**currentColor**: Use `fill="currentColor"` to inherit text color, making icons adapt to their context.

Visit the following resources to learn more:

- [@article@SVG - MDN](https://developer.mozilla.org/en-US/docs/Web/SVG)
- [@course@svg.guide - Nanda Syahrasyad](https://svg.guide/)
- [@article@SVG Path Commands - nan.fyi](https://www.nan.fyi/svg-paths)
- [@opensource@Heroicons](https://heroicons.com/)
- [@opensource@Lucide Icons](https://lucide.dev/)

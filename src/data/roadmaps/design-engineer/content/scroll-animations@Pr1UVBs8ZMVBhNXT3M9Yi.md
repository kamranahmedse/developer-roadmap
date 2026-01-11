# Scroll-Linked Animations

Scroll animations respond to scroll position—parallax effects, reveal animations, progress indicators. They add depth and engagement when used thoughtfully.

**Framer Motion useScroll**:
```tsx
const { scrollYProgress } = useScroll();

<motion.div style={{ opacity: scrollYProgress }} />
```

**useTransform**: Convert scroll progress to other values:
```tsx
const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);
const y = useTransform(scrollYProgress, [0, 1], [100, 0]);
```

**Intersection Observer**: For reveal-on-scroll effects:
```tsx
const { ref, inView } = useInView({ threshold: 0.2 });

<motion.div
  ref={ref}
  animate={inView ? "visible" : "hidden"}
/>
```

**Use Cases**:
- Progress indicators
- Parallax backgrounds
- Reveal animations as content enters viewport
- Sticky headers with scroll-aware styling

**Performance Considerations**:
- Use transform and opacity (GPU-accelerated)
- Debounce scroll handlers if needed
- Test on lower-powered devices
- Respect prefers-reduced-motion

**Native CSS**: `animation-timeline: scroll()` is emerging but not fully supported yet.

Visit the following resources to learn more:

- [@official@Scroll Animations - Framer Motion](https://www.framer.com/motion/scroll-animations/)
- [@article@Scroll-Driven Animations - Chrome](https://developer.chrome.com/articles/scroll-driven-animations/)
- [@video@Scroll Animations - Sam Selikoff](https://www.youtube.com/watch?v=aPs3qL4kkr0)

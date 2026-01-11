# Layout Animations

Framer Motion's layout animations automatically animate elements when their position or size changes. The `layout` prop enables smooth transitions that would be complex to implement manually.

**Basic Layout Animation**:
```tsx
<motion.div layout>
  {/* This will smoothly animate when its size/position changes */}
</motion.div>
```

**Use Cases**:
- Reordering lists
- Expanding/collapsing content
- Grid rearrangement
- Shared element transitions

**Shared Layout Animations**: Use `layoutId` to animate elements across different components:
```tsx
// In list view
<motion.div layoutId={`card-${id}`}>Card</motion.div>

// In detail view
<motion.div layoutId={`card-${id}`}>Expanded Card</motion.div>
```

**LayoutGroup**: Wrap related layout animations to ensure they coordinate:
```tsx
<LayoutGroup>
  <motion.div layout />
  <motion.div layout />
</LayoutGroup>
```

**Performance Tips**:
- Use `layout="position"` if only position changes (not size)
- Be cautious with layout animations on many elements
- Test on lower-powered devices

Visit the following resources to learn more:

- [@official@Layout Animations - Framer Motion](https://www.framer.com/motion/layout-animations/)
- [@article@Shared Layout Animations](https://www.framer.com/motion/layout-animations/#shared-layout-animations)
- [@video@Layout Animation Tutorial - Sam Selikoff](https://www.youtube.com/watch?v=0dR9XRqBuok)

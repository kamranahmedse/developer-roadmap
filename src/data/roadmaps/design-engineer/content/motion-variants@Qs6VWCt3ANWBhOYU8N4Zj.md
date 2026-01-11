# Motion Variants

Variants are named animation states that enable cleaner code and powerful orchestration. Instead of inline animate props, define variants once and reference by name.

**Basic Variants**:
```tsx
const variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
}

<motion.div variants={variants} initial="hidden" animate="visible" />
```

**Orchestration**: Parent variants can control children timing with `staggerChildren` and `delayChildren`:
```tsx
const container = {
  visible: {
    transition: { staggerChildren: 0.1 }
  }
}

const item = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 }
}
```

**Benefits**:
- Cleaner, reusable animation definitions
- Parent-child orchestration without prop drilling
- Easy to create complex, coordinated animations
- Variants propagate down to children automatically

**Best Practices**:
- Name variants semantically (`hidden`/`visible`, `open`/`closed`)
- Define variants outside component to prevent recreation
- Use orchestration for staggered list animations

Visit the following resources to learn more:

- [@official@Variants - Framer Motion](https://www.framer.com/motion/animation/#variants)
- [@article@Orchestration - Framer Motion](https://www.framer.com/motion/animation/#orchestration)
- [@video@Variants Tutorial - Sam Selikoff](https://www.youtube.com/watch?v=2V1WK-3HQNk)

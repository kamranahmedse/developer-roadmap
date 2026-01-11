# Framer Motion

Framer Motion is the premier animation library for React, providing declarative animations, gestures, and layout transitions. It's the tool of choice for Design Engineers building polished, interactive interfaces.

**Core Concepts**:
- **motion components**: `motion.div`, `motion.button`—wrappers that add animation powers
- **animate prop**: Define target state; Framer Motion handles interpolation
- **initial/exit**: Entry and exit animations
- **variants**: Named animation states for orchestration

**Basic Example**:
```tsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.3 }}
>
  Content
</motion.div>
```

**Why Framer Motion**:
- Declarative API that reads like design specs
- Spring physics for natural motion
- Layout animations that "just work"
- Gesture support (hover, tap, drag, pan)
- Exit animations with AnimatePresence
- Production-ready and performant

Visit the following resources to learn more:

- [@official@Framer Motion Documentation](https://www.framer.com/motion/)
- [@course@animations.dev - Emil Kowalski](https://animations.dev/)
- [@article@Framer Motion Recipes - Build UI](https://buildui.com/courses/framer-motion-recipes)
- [@video@Framer Motion Crash Course](https://www.youtube.com/watch?v=znbCa4Rr054)

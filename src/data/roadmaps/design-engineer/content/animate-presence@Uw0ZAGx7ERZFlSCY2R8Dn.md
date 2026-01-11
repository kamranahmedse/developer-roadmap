# AnimatePresence

AnimatePresence enables exit animations—animating elements as they're removed from the React tree. Without it, elements disappear instantly when their condition becomes false.

**Basic Usage**:
```tsx
<AnimatePresence>
  {isVisible && (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      Content
    </motion.div>
  )}
</AnimatePresence>
```

**Key Requirements**:
- Wrap conditional content with AnimatePresence
- Give direct children a unique `key` prop
- Define `exit` prop on motion components

**Mode Prop**:
- `mode="sync"` (default): Entering and exiting elements animate simultaneously
- `mode="wait"`: Wait for exit animation to complete before entering
- `mode="popLayout"`: Pop exiting elements from layout flow

**Use Cases**:
- Modals and dialogs fading out
- Toast notifications dismissing
- Page transitions
- Accordion content collapsing
- Dropdown menus closing

Visit the following resources to learn more:

- [@official@AnimatePresence - Framer Motion](https://www.framer.com/motion/animate-presence/)
- [@article@Exit Animations - Framer Motion](https://www.framer.com/motion/animate-presence/#exit-animations)
- [@video@AnimatePresence Tutorial - Sam Selikoff](https://www.youtube.com/watch?v=Qpvz9_HkUhw)

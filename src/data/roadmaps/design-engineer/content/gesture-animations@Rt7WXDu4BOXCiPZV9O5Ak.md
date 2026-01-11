# Gesture Animations

Framer Motion's gesture props—whileHover, whileTap, whileFocus, whileDrag—add interactivity without manual event handling. They're declarative descriptions of how elements should respond to user interaction.

**Gesture Props**:
```tsx
<motion.button
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
  whileFocus={{ boxShadow: "0 0 0 3px rgba(66, 153, 225, 0.6)" }}
>
  Click me
</motion.button>
```

**Drag Gestures**:
```tsx
<motion.div
  drag
  dragConstraints={{ left: 0, right: 300, top: 0, bottom: 300 }}
  whileDrag={{ scale: 1.1 }}
/>
```

**Combining with Variants**:
```tsx
<motion.div
  variants={{ hover: { scale: 1.1 }, tap: { scale: 0.9 } }}
  whileHover="hover"
  whileTap="tap"
/>
```

**Best Practices**:
- Keep hover/tap effects subtle (1.02-1.05 scale feels natural)
- Ensure touch devices work (no hover on mobile)
- Use springs for responsive feel
- Consider accessibility—don't hide critical info behind gestures

Visit the following resources to learn more:

- [@official@Gestures - Framer Motion](https://www.framer.com/motion/gestures/)
- [@article@Hover and Tap - Framer Motion](https://www.framer.com/motion/gestures/#hover)
- [@video@Gesture Animations - Sam Selikoff](https://www.youtube.com/watch?v=cnE9D3EMr-w)

# Micro-interactions

Micro-interactions are small, contained moments of animation that provide feedback, guide users, and add delight. They're the details that make interfaces feel polished and responsive.

**The Four Parts** (Dan Saffer's framework):
1. **Trigger**: What initiates it (click, hover, scroll)
2. **Rules**: What happens during the interaction
3. **Feedback**: What users see/feel
4. **Loops & Modes**: What happens on repeat or over time

**Common Micro-interactions**:
- Button press feedback (scale down slightly)
- Toggle switches animating between states
- Form validation feedback
- Like/heart animations
- Pull-to-refresh
- Hover reveals
- Input focus effects

**Design Principles**:
- Keep them fast (100-300ms)
- Make them purposeful, not decorative
- Ensure they provide clear feedback
- Maintain consistency across similar actions

**Implementation**:
```tsx
<motion.button
  whileHover={{ scale: 1.02 }}
  whileTap={{ scale: 0.98 }}
  transition={{ type: "spring", stiffness: 400, damping: 17 }}
>
  Click me
</motion.button>
```

**Restraint**: Not everything needs micro-interaction. Add them where feedback matters, not everywhere possible.

Visit the following resources to learn more:

- [@article@Micro-interactions - UX Planet](https://uxplanet.org/micro-interactions-the-secret-to-great-app-design-4cfe70fbaccf)
- [@article@Microinteractions - Dan Saffer](https://microinteractions.com/)
- [@video@Micro-interactions Design](https://www.youtube.com/watch?v=FJt7gNi3Nr4)

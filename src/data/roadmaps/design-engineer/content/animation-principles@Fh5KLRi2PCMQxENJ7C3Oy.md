# Animation Principles for UI

Animation in UI isn't decoration—it provides feedback, guides attention, creates continuity, and makes interfaces feel alive. Understanding animation principles helps you create motion that serves users rather than distracting them.

**Purpose of UI Animation**:
- **Feedback**: Confirm actions (button press, form submit)
- **Guidance**: Direct attention to important changes
- **Continuity**: Show relationships between states
- **Delight**: Add personality and polish

**Duration Guidelines**:
- Micro-interactions: 100-200ms
- State changes: 200-300ms
- Page transitions: 300-500ms
- Longer animations frustrate users

**Easing (Timing Functions)**:
- Use ease-out for entrances (elements arriving)
- Use ease-in for exits (elements leaving)
- Linear motion feels robotic
- Springs feel more natural than bezier curves

**Restraint**: Less is more. Too much animation is worse than none. Animate purposefully. If you can't explain why something moves, it probably shouldn't.

**Accessibility**: Respect `prefers-reduced-motion`. Some users experience motion sickness or vestibular disorders.

Visit the following resources to learn more:

- [@article@Animation Principles - Material Design](https://m3.material.io/styles/motion/overview)
- [@article@Understanding Motion - Framer](https://www.framer.com/motion/)
- [@course@animations.dev - Emil Kowalski](https://animations.dev/)
- [@video@Animation UX - The Illusion of Life](https://www.youtube.com/watch?v=O94rQJTNi4Y)

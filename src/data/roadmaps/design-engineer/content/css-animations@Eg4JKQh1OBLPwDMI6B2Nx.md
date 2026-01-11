# CSS Keyframe Animations

CSS keyframe animations enable complex, multi-step animations that go beyond simple transitions. They're ideal for loading states, attention-grabbing effects, and decorative motion.

**@keyframes**: Define animation stages with percentages (0%, 50%, 100%) or keywords (from, to). Each stage specifies property values.

```css
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
```

**Animation Properties**:
- `animation-name`: References your @keyframes
- `animation-duration`: How long one cycle takes
- `animation-timing-function`: Easing curve
- `animation-iteration-count`: Times to repeat (or `infinite`)
- `animation-direction`: Normal, reverse, alternate
- `animation-fill-mode`: How to apply styles before/after

**Use Cases**: Loading spinners, skeleton screens, pulse effects, entrance animations, decorative background motion.

**Performance**: Same rules as transitions—stick to transform and opacity. Use `will-change` sparingly for optimization hints.

Visit the following resources to learn more:

- [@article@CSS Animations - MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Animations/Using_CSS_animations)
- [@article@Animations - web.dev](https://web.dev/learn/css/animations/)
- [@video@CSS Keyframe Animations - Kevin Powell](https://www.youtube.com/watch?v=YszONjKpgg4)
- [@opensource@Animista - Animation Generator](https://animista.net/)

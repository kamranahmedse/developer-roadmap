# Spring Physics Animation

Spring animations use physical properties instead of duration and easing. They feel more natural and respond better to interruption—if you change the target mid-animation, springs adapt smoothly.

**Spring Properties**:
- **stiffness**: How "tight" the spring is (higher = snappier)
- **damping**: Resistance to motion (higher = less bouncy)
- **mass**: Weight of the object (higher = more sluggish)

**Common Presets**:
```tsx
// Snappy, no bounce
transition={{ type: "spring", stiffness: 500, damping: 30 }}

// Gentle with slight bounce
transition={{ type: "spring", stiffness: 200, damping: 20 }}

// Bouncy
transition={{ type: "spring", stiffness: 300, damping: 10 }}
```

**Why Springs Work Better**:
- Natural feel—real objects move with physics, not bezier curves
- Interruptible—changing targets mid-animation looks natural
- Velocity awareness—springs account for current momentum

**Framer Motion Defaults**: Framer Motion uses springs by default for many animations. You can customize or switch to tween (duration-based) when needed.

**When to Use Duration Instead**: Loading spinners, progress bars, or when precise timing matters more than natural feel.

Visit the following resources to learn more:

- [@official@Spring - Framer Motion](https://www.framer.com/motion/transition/#spring)
- [@article@Introduction to Spring Physics - Josh Comeau](https://www.joshwcomeau.com/animation/a-friendly-introduction-to-spring-physics/)
- [@video@Spring Animations - Sam Selikoff](https://www.youtube.com/watch?v=1vKiPwEYbyk)

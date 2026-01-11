# Typography Token Systems

Typography tokens systematize font choices, creating consistent hierarchy and readability across your product. They define not just sizes, but the complete typographic scale.

**Token Categories**:
- **Font families**: `font-sans`, `font-serif`, `font-mono`
- **Font sizes**: `text-xs` through `text-4xl` (or semantic: `text-body`, `text-heading`)
- **Font weights**: `font-normal`, `font-medium`, `font-semibold`, `font-bold`
- **Line heights**: `leading-tight`, `leading-normal`, `leading-relaxed`
- **Letter spacing**: `tracking-tight`, `tracking-normal`, `tracking-wide`

**Type Scale**: Use a consistent ratio (1.25, 1.333, 1.5) between sizes. This creates harmonic relationships. Tools like Type Scale and Utopia help generate scales.

**Composite Tokens**: Define complete text styles that combine properties:
```
heading-1: { size: 3xl, weight: bold, leading: tight }
body: { size: base, weight: normal, leading: relaxed }
caption: { size: sm, weight: normal, leading: normal }
```

**Fluid Typography**: Use clamp() for sizes that scale smoothly between breakpoints without media queries. Utopia generates these calculations.

Visit the following resources to learn more:

- [@article@Typography in Design Systems - Nathan Curtis](https://medium.com/eightshapes-llc/typography-in-design-systems-6ed771432f1e)
- [@opensource@Type Scale Calculator](https://typescale.com/)
- [@opensource@Utopia - Fluid Type Scale](https://utopia.fyi/type/)
- [@video@Typography for the Web](https://www.youtube.com/watch?v=wARxDg8G4cI)

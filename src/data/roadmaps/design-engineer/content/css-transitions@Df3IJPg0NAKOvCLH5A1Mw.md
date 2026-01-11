# CSS Transitions

CSS transitions animate property changes smoothly over time. They're the foundation of UI micro-interactions—hover effects, focus states, and state changes that make interfaces feel responsive.

**Core Properties**:
- `transition-property`: Which properties to animate (or `all`)
- `transition-duration`: How long (150-300ms for UI)
- `transition-timing-function`: The easing curve
- `transition-delay`: Wait before starting

**Shorthand**: `transition: all 0.2s ease-out` covers most use cases.

**What to Transition**: Color, background-color, opacity, transform, box-shadow. Avoid transitioning width/height (use transform: scale instead) and layout properties for performance.

**Timing Functions**:
- `ease-out`: Best for entrances (fast start, slow end)
- `ease-in`: Best for exits (slow start, fast end)
- `ease-in-out`: For state changes

**Performance**: Transitions on `transform` and `opacity` are GPU-accelerated. Transitioning layout properties (width, margin, padding) causes reflow and can be janky.

Visit the following resources to learn more:

- [@article@CSS Transitions - MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Transitions/Using_CSS_transitions)
- [@article@Transitions - web.dev](https://web.dev/learn/css/transitions/)
- [@video@CSS Transitions Tutorial - Kevin Powell](https://www.youtube.com/watch?v=Nloq6uzF8RQ)
- [@opensource@Easing Functions Cheat Sheet](https://easings.net/)

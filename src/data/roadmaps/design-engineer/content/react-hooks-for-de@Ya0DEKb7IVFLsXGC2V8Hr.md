# Essential React Hooks for Design Engineers

While you should know all React hooks, certain hooks are particularly important for Design Engineer work—managing animations, measurements, and UI state.

**useRef**: Access DOM elements for measurements, focus management, and animation libraries.
```tsx
const elementRef = useRef<HTMLDivElement>(null);
// Get dimensions, scroll position, or pass to Framer Motion
```

**useEffect**: Sync with external systems, handle resize observers, intersection observers.
```tsx
useEffect(() => {
  const observer = new ResizeObserver(entries => {
    // React to size changes
  });
  observer.observe(elementRef.current);
  return () => observer.disconnect();
}, []);
```

**useLayoutEffect**: Measure DOM before browser paints. Use for animations that need dimensions.

**useMemo/useCallback**: Optimize expensive style calculations and prevent unnecessary re-renders in animated components.

**Custom Hooks for DE**:
- `useMediaQuery`: Respond to breakpoints in JS
- `useMeasure`: Track element dimensions
- `useReducedMotion`: Detect motion preferences
- `useScrollPosition`: Track scroll for animations
- `useInView`: Intersection observer wrapper

Visit the following resources to learn more:

- [@official@React Hooks Reference](https://react.dev/reference/react)
- [@article@useHooks Collection](https://usehooks.com/)
- [@article@Custom Hooks - React](https://react.dev/learn/reusing-logic-with-custom-hooks)
- [@video@React Hooks Explained](https://www.youtube.com/watch?v=TNhaISOUy6Q)

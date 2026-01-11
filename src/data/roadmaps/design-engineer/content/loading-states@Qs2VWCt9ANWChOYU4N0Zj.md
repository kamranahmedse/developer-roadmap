# Loading State Design

Loading states are often overlooked but significantly impact perceived performance and user experience. Design Engineers craft loading experiences that feel fast and intentional.

**Types of Loading States**:

**Skeleton Screens**: Show the shape of content before it loads. Better than spinners for content-heavy pages.
```tsx
<div className="animate-pulse bg-gray-200 h-4 w-3/4 rounded" />
```

**Spinners**: For actions with unknown duration. Keep them small and subtle for inline use.

**Progress Bars**: When you can track actual progress (file uploads, multi-step processes).

**Optimistic UI**: Update UI immediately, revert if operation fails. Makes interfaces feel instant.

**Design Principles**:
- Match skeleton shapes to actual content
- Use subtle animation (pulse, shimmer)
- Avoid layout shift when content loads
- Consider perceived vs actual performance

**Implementation Tips**:
- Use Suspense boundaries in React
- Implement loading.tsx in Next.js App Router
- Debounce rapid loading states (avoid flash)
- Maintain interactivity where possible during load

**What NOT to Do**:
- Full-page spinners that block interaction
- Jarring transitions when content appears
- Different layouts between loading and loaded states

Visit the following resources to learn more:

- [@article@Skeleton Screens - UX Collective](https://uxdesign.cc/what-you-should-know-about-skeleton-screens-a820c45a571a)
- [@article@React Suspense](https://react.dev/reference/react/Suspense)
- [@video@Loading States UX](https://www.youtube.com/watch?v=hbmJpKRFQL0)

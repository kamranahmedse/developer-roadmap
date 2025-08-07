# useCallback

`useCallback` is a React hook that returns a memoized version of a callback function. It's used to optimize performance by preventing unnecessary re-renders. Specifically, it helps avoid recreating functions when their dependencies haven't changed, which can be useful when passing callbacks to child components that rely on referential equality to prevent re-rendering.

Visit the following resources to learn more:

- [@official@React Documentation on useCallback](https://react.dev/reference/react/useCallback)
- [@article@useCallback Explained in Depth](https://kentcdodds.com/blog/usememo-and-usecallback)
- [@article@useCallback Hook: An Introductory Guide](https://dmitripavlutin.com/dont-overuse-react-usecallback/)

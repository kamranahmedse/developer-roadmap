# Suspense

React Suspense is a feature in React that allows components to "suspend" rendering while they are waiting for something to happen, such as data to be fetched from an API or an image to be loaded. Suspense allows developers to create a more seamless user experience by rendering a placeholder or fallback component while the component is waiting for the required data to be available.

Here is a general overview of how React Suspense works:

- A component that uses Suspense wraps a component that may need to "suspend" rendering in a `Suspense` component.
- The wrapped component throws a promise when it needs to suspend rendering.
- The `Suspense` component catches the promise and renders a fallback component while the promise is pending.
- When the promise resolves, the wrapped component is rendered with the required data.

Visit the following resources to learn more:

- [@official@React Suspense](https://react.dev/reference/react/Suspense)
- [@article@React Suspense - A complete guide](https://hygraph.com/blog/react-suspense)

You can use React's `React.lazy()` function in conjunction with dynamic `import()` to lazily load a component. This is often combined with `Suspense` to display fallback content while the component is being loaded.

```js
const MyComponent = React.lazy(() => import('./MyComponent'));
```

> Using this pattern requires that the component being lazy loaded is exported as a default export.

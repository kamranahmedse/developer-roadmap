Strict Mode is a tool in React for highlighting potential problems in an application. By wrapping a component tree with `StrictMode`, React will activate additional checks and warnings for its descendants. This doesn't affect the production build but provides insights during development.

```js
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

const root = createRoot(document.getElementById('root'));
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
```

In Strict Mode, React does a few extra things during development:

1. It renders components twice to catch bugs caused by impure rendering.
2. It runs side-effects (like data fetching) twice to find mistakes in them caused by missing effect cleanup.
3. It checks if deprecated APIs are used, and logs a warning message to the console if so.

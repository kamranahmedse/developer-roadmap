The `flushSync` function in React is used to flush updates synchronously. It schedules updates to be performed inside a high-priority task, ensuring that the updates are executed immediately and synchronously before returning control to the caller.

```js
import { flushSync } from 'react-dom';

flushSync(callback);
```

This is useful in situations where you need the DOM to be updated immediately, such as for measurements or to ensure synchronous rendering. However, excessive use of `flushSync` can lead to degraded performance, so it should be used judiciously.

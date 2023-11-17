**Custom hooks** are a mechanism for code reuse in React and allow you to extract component logic into reusable functions. Custom hooks can be used to share logic between components or to abstract away complex logic to make components more readable.

Let's look at an example of a custom hook that return network status information:

## Creating a Custom hook

Custom hooks are named with the prefix `use` and can call other hooks if needed. They can also accept arguments and return values.

```js
import { useState, useEffect } from 'react';

function useNetworkStatus() {
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    function handleOnline() {
      setIsOnline(true);
    }

    function handleOffline() {
      setIsOnline(false);
    }

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return isOnline;
}
```

The custom hook above uses the `useState` and `useEffect` hooks to track the network status of the browser. It returns a boolean value that indicates whether the browser is online or offline.

## Using a Custom hook

```js
function NetworkStatus() {
  const isOnline = useNetworkStatus();

  return (
    <div>
      <p>You are {isOnline ? 'online' : 'offline'}.</p>
    </div>
  );
}
```

# State

State is an object that holds data managed within a React component. It allows components to become dynamic and interactive by keeping track of its data changes. When the state of a component changes, React re-renders the component and updates the DOM accordingly.

In a functional component, utilize the `useState` hook to initialize state:

```javascript
import React, { useState } from 'react';

function App() {
  const [text, setText] = useState('Hello, World!');
  //...
}
```

## Accessing State


In functional components, access the state by utilizing the first variable from the `useState` hook:

```javascript
function App() {
  const [text, setText] = useState('Hello, World!');
  return <div>{text}</div>;
}
```

## Updating State

Utilize the second variable returned from the `useState` hook (which is a function) to update the state:

```javascript
function App() {
  const [text, setText] = useState('Hello, World!');

  function handleClick() {
    setText('State updated!');
  }

  return (
    <div>
      <div>{text}</div>
      <button onClick={handleClick}>Update State</button>
    </div>
  );
}
```

Remember: do not modify the state directly; always use the `setState()` method or updater function provided by the `useState` hook.

- [@official@Component State](https://react.dev/learn/managing-state)
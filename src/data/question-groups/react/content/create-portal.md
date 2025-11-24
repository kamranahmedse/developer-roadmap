`createPortal` is a method on the `ReactDOM` object. It is used to render a React element into another DOM element outside of the parent component. This is useful for cases like modals, popups, or tooltips where you want the component to break out of its container.

```js
ReactDOM.createPortal(child, container);
```

The first argument (`child`) is any renderable React child, such as an element, string, or fragment. The second argument (`container`) is a DOM element.

The `Modal` component below is a simple example of a modal component that uses `createPortal` to render its children into a DOM element with the id `root`. The `Modal` component is rendered as a child of the `App` component, but the modal itself is rendered outside of the `App` component.

```js
import { createPortal } from 'react-dom';

export function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      style={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: 'white',
        padding: '20px',
        zIndex: 1000,
      }}
    >
      <button onClick={onClose} aria-label="Close Modal">
        Close
      </button>
      {children}
    </div>,
    document.getElementById('root')
  );
}
```

The `Modal` component can be used like this:

```js
import { useState } from 'react';
import { Modal } from './modal';

export function App() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button onClick={() => setIsOpen(true)}>Open Modal</button>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <h1>Modal Title</h1>
        <p>Modal Content</p>
      </Modal>
    </div>
  );
}
```

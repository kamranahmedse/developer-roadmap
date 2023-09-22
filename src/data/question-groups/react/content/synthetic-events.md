React differs from HTML in that it uses a synthetic event system instead of directly binding to the browser’s native events. This system brings consistency and performance benefits, and it allows React to be agnostic of environments like browser, server, or React Native.

The events such as `onClick`, `onSubmit`, `onFocus`, etc. are all camel-cased to be consistent with the naming convention in JavaScript. React event handlers are written inside curly braces:

```javascript
function activateLasers(e) {
    e.preventDefault();
    console.log('The button was clicked.');
}

<button onClick={activateLasers}>Activate Lasers</button>
```

In this case `activateLasers` is the event handler which will receive a React event object which, also known as a "synthetic event". It conforms to the same standard as the underlying DOM events, but fixes some browser inconsistencies.

Some React events do not map directly to the browser’s native events. For example in `onMouseLeave`, `e.nativeEvent` will point to a `mouseout` event. If you need the underlying browser event for some reason, read it from `e.nativeEvent`.

Visit the [React documentation](https://react.dev/reference/react-dom/components/common#react-event-object) for further details.
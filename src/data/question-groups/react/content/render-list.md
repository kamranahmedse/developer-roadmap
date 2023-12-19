In React, you can render a list by using the JavaScript `map` function to iterate over an array of items and return a JSX element for each item. It's important to provide a unique `key` prop to each element in the list for React's diffing algorithm to function efficiently during re-renders. Here's a basic example:

```javascript
const items = ['Apple', 'Banana', 'Cherry'];

function FruitList() {
  return (
    <ul>
      {items.map((fruit, index) => (
        <li key={index}>{fruit}</li>
      ))}
    </ul>
  );
}
```

> Note: While using the index as a key can work in some cases, it's generally not recommended for dynamic lists where items can be added, removed, or reordered.

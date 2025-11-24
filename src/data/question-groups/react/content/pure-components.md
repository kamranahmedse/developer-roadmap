Pure components re-render only when the props passed to the component changes. For example, if you have a pure child component inside a parent component state changes in the parent component will not re-render the child component unless the props passed to the child component change.

To create a pure component, you can use the `memo` function from React. It is a higher order component which takes a component as an argument and returns a new component. The new component renders only if the props change.

```javascript
import React, { memo } from 'react';

const ChildComponent = ({ name }) => {
  console.log('Rendering child component');
  return <div>{name}</div>;
};

const PureChildComponent = memo(ChildComponent);

const ParentComponent = () => {
  const [count, setCount] = useState(0);
  const [name, setName] = useState('John');

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>Count - {count}</button>
      <button onClick={() => setName('Jane')}>Change name</button>
      <PureChildComponent name={name} />
    </div>
  );
};
```
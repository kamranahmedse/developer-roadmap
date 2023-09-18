`setState` method is asynchronous by nature. It does not immediately mutate the state but creates a pending state transition. Accessing state after calling this method can potentially return the existing value. 

To avoid this, pass a callback function as a second argument to the `setState` method. This callback function will be executed once the state is updated.

```js
function handleClick() {
  // `username` is some state variable
  console.log(username);
  setUsername('John Doe');
  console.log(username); // still the old value
    
  // pass a callback function as a second argument
  setUsername('John Doe', () => {
    console.log(username); // now it will have the updated value
  });
}
```
To run a piece of code after a certain time, you can use `setTimeout` function in JavaScript. It accepts a function and a time interval in milliseconds. It returns a unique id which you can use to clear the timeout using `clearTimeout` function.

```js
const timeoutId = setTimeout(() => {
  console.log('Hello World');
}, 1000);

// Output:
// Hello World
```

In the above code, the `setTimeout` function runs the callback function after 1000 milliseconds (1 second) and prints `Hello World` to the console. It returns a unique id which you can use to clear the timeout using `clearTimeout` function.

```js
clearTimeout(timeoutId);
```

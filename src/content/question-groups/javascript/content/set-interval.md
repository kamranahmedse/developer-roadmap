You can run some codes on interval using `setInterval` function in JavaScript. It accepts a function and a time interval in milliseconds. It returns a unique id which you can use to clear the interval using `clearInterval` function.

```js
const intervalId = setInterval(() => {
  console.log('Hello World');
}, 1000);

// Output:
// Hello World
// Hello World
```

In the above code, the `setInterval` function runs the callback function every 1000 milliseconds (1 second) and prints `Hello World` to the console. It returns a unique id which you can use to clear the interval using `clearInterval` function.

```js
clearInterval(intervalId);
```

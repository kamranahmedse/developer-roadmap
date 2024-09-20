Order priorities of `process.nextTick`, `Promise`, `setTimeout` and `setImmediate` are as follows:

1. `process.nextTick`: Highest priority, executed immediately after the current event loop cycle, before any other I/O events or timers.
2. `Promise`: Executed in the microtask queue, after the current event loop cycle, but before the next one.
3. `setTimeout`: Executed in the timer queue, after the current event loop cycle, with a minimum delay specified in milliseconds.
4. `setImmediate`: Executed in the check queue, but its order may vary based on the system and load. It generally runs in the next iteration of the event loop after I/O events.

```js
console.log('start');
Promise.resolve().then(() => console.log('Promise'));
setTimeout(() => console.log('setTimeout'), 0);
process.nextTick(() => console.log('process.nextTick'));
setImmediate(() => console.log('setImmediate'));
console.log('end');

// Output:
// start
// end
// process.nextTick
// Promise
// setTimeout
// setImmediate
```

In summary, the order of execution is generally `process.nextTick` > `Promise` > `setTimeout` > `setImmediate`. However, keep in mind that the behavior may vary in specific situations, and the order might be influenced by factors such as system load and other concurrent operations.

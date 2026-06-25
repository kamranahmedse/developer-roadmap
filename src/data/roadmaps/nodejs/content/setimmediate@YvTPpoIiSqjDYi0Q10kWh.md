# setImmediate
 
`setImmediate()` schedules a callback to run in the check phase of the event loop, after I/O events have been processed. It is similar to `setTimeout(fn, 0)` but is guaranteed to run before any timers in some cases. It is used when you want to yield control to the event loop before continuing execution.

Visit the following resources to learn more:

- [@official@Understanding setImmediate](https://nodejs.org/en/learn/asynchronous-work/understanding-setimmediate)
- [@article@Understanding setImmediate](https://developer.mozilla.org/en-US/docs/Web/API/Window/setImmediate)
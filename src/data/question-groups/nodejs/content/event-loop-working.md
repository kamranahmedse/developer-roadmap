The Node.js event loop is the mechanism that allows Node.js to perform non-blocking I/O operations despite JavaScript being single-threaded. It continuously checks for and processes events and callbacks in a specific order through six distinct phases.

## Six Phases of Event Loop

### 1. Timers Phase
Executes callbacks scheduled by `setTimeout()` and `setInterval()`.

```js
setTimeout(() => {
  console.log('Timer callback');
}, 100);
```

### 2. Pending Callbacks Phase
Executes I/O callbacks deferred from the previous cycle.

### 3. Idle, Prepare Phase
Used internally by Node.js.

### 4. Poll Phase
Retrieves new I/O events and executes I/O-related callbacks. This is where most application code runs.

```js
const fs = require('fs');

fs.readFile('file.txt', (err, data) => {
  console.log('File read - executed in poll phase');
});
```

### 5. Check Phase
Executes `setImmediate()` callbacks.

```js
setImmediate(() => {
  console.log('setImmediate callback');
});
```

### 6. Close Callbacks Phase
Handles close events like `socket.on('close')`.

## Microtasks vs Macrotasks

Microtasks (`process.nextTick()`, Promises) execute between each phase:

```js
setTimeout(() => console.log('1: setTimeout'), 0);
Promise.resolve().then(() => console.log('2: Promise'));
process.nextTick(() => console.log('3: nextTick'));

// Output order:
// 3: nextTick
// 2: Promise
// 1: setTimeout
```

## process.nextTick() vs setImmediate()

```js
// process.nextTick - executes before any I/O
process.nextTick(() => console.log('nextTick'));

// setImmediate - executes in check phase (after I/O)
setImmediate(() => console.log('setImmediate'));

// Inside I/O callback, setImmediate always runs first
fs.readFile('file.txt', () => {
  setImmediate(() => console.log('setImmediate'));
  setTimeout(() => console.log('setTimeout'), 0);
  // Output: setImmediate, setTimeout
});
```

## Best Practices

- Never block the event loop with synchronous operations
- Use `setImmediate()` for breaking up CPU-intensive work
- Avoid recursive `process.nextTick()` calls (can starve I/O)
- Use worker threads for heavy computation


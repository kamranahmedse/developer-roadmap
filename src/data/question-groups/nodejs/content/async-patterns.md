Node.js provides multiple ways to handle asynchronous operations. Understanding when to use each pattern is crucial for writing clean, maintainable code and handling errors properly.

## 1. Callbacks (Traditional)

The original async pattern in Node.js. Error-first callbacks are the convention.

```js
import fs from 'node:fs';

// Error-first callback pattern
fs.readFile('file.txt', 'utf8', (err, data) => {
  if (err) {
    console.error('Error:', err.message);
    return;
  }
  console.log('Data:', data);
});

// Callback Hell (avoid this!)
fs.readFile('file1.txt', (err, data1) => {
  fs.readFile('file2.txt', (err, data2) => {
    fs.readFile('file3.txt', (err, data3) => {
      // Nested callbacks become unmanageable
    });
  });
});
```

## 2. Promises

Cleaner chaining and better error handling than callbacks.

```js
import fs from 'node:fs/promises';

// Promise chain
fs.readFile('file1.txt', 'utf8')
  .then((data1) => {
    console.log(data1);
    return fs.readFile('file2.txt', 'utf8');
  })
  .then((data2) => {
    console.log(data2);
  })
  .catch((err) => {
    console.error('Error:', err.message);
  })
  .finally(() => {
    console.log('Cleanup');
  });

// Creating a Promise
function delay(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

// Promisify callback functions
import { promisify } from 'node:util';
import fsCallback from 'node:fs'; // callback-based API
const readFileAsync = promisify(fsCallback.readFile);
```

## 3. Async/Await

Syntactic sugar over Promises. Most readable and maintainable.

```js
import fs from 'node:fs/promises';

async function readFiles() {
  try {
    const data1 = await fs.readFile('file1.txt', 'utf8');
    const data2 = await fs.readFile('file2.txt', 'utf8');
    const data3 = await fs.readFile('file3.txt', 'utf8');
    
    return { data1, data2, data3 };
  } catch (err) {
    console.error('Error:', err.message);
    throw err;
  }
}

// Call async function
readFiles()
  .then(result => console.log(result))
  .catch(err => console.error(err));
```

## Parallel vs Sequential Execution

### Sequential (One after another)

```js
async function sequential() {
  const start = Date.now();
  
  const result1 = await fetchData1(); // 1 second
  const result2 = await fetchData2(); // 1 second
  const result3 = await fetchData3(); // 1 second
  
  console.log(`Time: ${Date.now() - start}ms`); // ~3000ms
}
```

### Parallel (All at once)

```js
async function parallel() {
  const start = Date.now();
  
  const [result1, result2, result3] = await Promise.all([
    fetchData1(),
    fetchData2(),
    fetchData3()
  ]);
  
  console.log(`Time: ${Date.now() - start}ms`); // ~1000ms
}
```

## Promise Utilities

### Promise.all() - All must succeed

```js
const results = await Promise.all([
  fetch('/api/users'),
  fetch('/api/posts'),
  fetch('/api/comments')
]);
// Fails if ANY promise rejects
```

### Promise.allSettled() - Get all results

```js
const results = await Promise.allSettled([
  fetch('/api/users'),
  fetch('/api/posts'),
  Promise.reject('Error')
]);
// Returns all results, even if some fail
// [{ status: 'fulfilled', value: ... }, { status: 'rejected', reason: ... }]
```

### Promise.race() - First to complete

```js
const result = await Promise.race([
  fetch('/api/data'),
  delay(5000).then(() => { throw new Error('Timeout'); })
]);
```

### Promise.any() - First to succeed

```js
const result = await Promise.any([
  fetch('/api/primary'),
  fetch('/api/backup1'),
  fetch('/api/backup2')
]);
// Returns first successful result
```

## Error Handling Comparison

```js
// Callbacks
doSomething((err, result) => {
  if (err) return handleError(err);
  // handle result
});

// Promises
doSomething()
  .then(result => { /* handle result */ })
  .catch(err => handleError(err));

// Async/Await
try {
  const result = await doSomething();
  // handle result
} catch (err) {
  handleError(err);
}
```

## When to Use Each Pattern

| Pattern | Best For | Avoid When |
|---------|----------|------------|
| Callbacks | Legacy code, streams, event emitters | New code, complex flows |
| Promises | Chaining operations, library APIs | Simple one-off operations |
| Async/Await | Most modern code, readability | Top-level module scope (ESM) |

## Common Mistakes

### Forgetting to await

```js
// ❌ Wrong - returns Promise, not result
async function getData() {
  const data = fetchData(); // Missing await!
  return data;
}

// ✅ Correct
async function getData() {
  const data = await fetchData();
  return data;
}
```

### Unnecessary async

```js
// ❌ Unnecessary async wrapper
async function getValue() {
  return await Promise.resolve(42);
}

// ✅ Just return the promise
function getValue() {
  return Promise.resolve(42);
}
```

### Not handling rejections

```js
// ❌ Unhandled rejection
async function riskyOperation() {
  const data = await fetchData(); // Can throw!
}

// ✅ Always handle errors
async function safeOperation() {
  try {
    const data = await fetchData();
    return data;
  } catch (err) {
    console.error('Failed:', err);
    return null;
  }
}
```


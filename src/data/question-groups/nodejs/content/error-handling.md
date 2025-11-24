There are four fundamental strategies to report errors in Node.js:

## `try...catch` blocks

`try...catch` blocks are the most basic way to handle errors in JavaScript. They are synchronous and can only be used to handle errors in synchronous code. They are not suitable for asynchronous code, such as callbacks and promises.

```js
import fs from 'node:fs';

try {
  const data = fs.readFileSync('file.md', 'utf-8');
  console.log(data);
} catch (err) {
  console.error(err);
}
```

## Callbacks

Callbacks are the most common way to handle errors in asynchronous code. They are passed as the last argument to a function and are called when the function completes or fails.

```js
import fs from 'node:fs';

fs.readFile('file.md', 'utf-8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  console.log(data);
});
```

## Promises

Promises are a more modern way to handle errors in asynchronous code. They are returned by functions and can be chained together. They are resolved when the function completes and rejected when it fails.

```js
import fs from 'node:fs/promises';

fs.readFile('file.md', 'utf-8')
  .then((data) => {
    console.log(data);
  })
  .catch((err) => {
    console.error(err);
  });
```

## Event emitters

Event emitters are a more advanced way to handle errors in asynchronous code. They are returned by functions and emit an `error` event when they fail. They are resolved when the function completes and rejected when it fails.

```js
import fs from 'node:fs';

const reader = fs.createReadStream('file.md', 'utf-8');
reader.on('data', (data) => {
  console.log(data);
});

reader.on('error', (err) => {
  console.error(err);
});
```

The core difference between `Promise.all()` and `Promise.allSettled()` is that `Promise.all()` rejects immediately if any of the promises reject whereas `Promise.allSettled()` waits for all of the promises to settle (either resolve or reject) and then returns the result.

## Initialize

```js
const promise1 = Promise.resolve('Promise 1 resolved');
const promise2 = Promise.reject('Promise 2 rejected');
```

## Using `Promise.all()`

```js
Promise.all([promise1, promise2])
  .then((values) => {
    console.log(values);
  })
  .catch((error) => {
    console.log('An error occurred in Promise.all():', error);
  });

// Output:
// An error occurred in Promise.all(): Promise 2 rejected
```

In the above code, the `Promise.all()` rejects immediately when any of the `promise2` rejects.

## Using `Promise.allSettled()`

```js
Promise.allSettled([promise1, promise2]).then((results) => {
  results.forEach((result, index) => {
    if (result.status === 'fulfilled') {
      console.log(
        `Promise ${index + 1} was fulfilled with value:`,
        result.value
      );
    } else {
      console.log(
        `Promise ${index + 1} was rejected with reason:`,
        result.reason
      );
    }
  });
});

// Output:
// Promise 1 was fulfilled with value: Promise 1 resolved
// Promise 2 was rejected with reason: Promise 2 rejected
```

In the above code, the `Promise.allSettled()` waits for all of the promises to settle (either resolve or reject) and then returns the result.

In order to handle errors in promises, we can use the `catch` method or the second argument of the `then` method.

## Rejecting a promise

```js
const promise = new Promise((resolve, reject) => {
  reject(new Error('Something went wrong'));
});
```

## Catch method

In this method, we can pass a `callback` function that will be called when the promise is `rejected`.

```js
promise
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.log(error.message);
  });
```

## Second argument of the then method

In this method, we can pass two `callback` functions as arguments. The first one will be called when the promise is `resolved` and the second one will be called when the promise is `rejected`.

```js
promise.then(
  (result) => {
    console.log(result);
  },
  (error) => {
    console.log(error.message);
  }
);
```

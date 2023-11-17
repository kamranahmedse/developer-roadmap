The `finally` block will be executed when the promise is `resolved` or `rejected`.

```js
promise
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.log(error.message);
  })
  .finally(() => {
    console.log('Finally Promise has settled');
  });
```

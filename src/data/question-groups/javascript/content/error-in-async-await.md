In order to handle errors in async/await, we can use the `try/catch` statement.

## Rejecting a promise

```js
const promise = new Promise((resolve, reject) => {
  reject(new Error('Something went wrong'));
});
```

## Try/catch statement

```js
async function main() {
  try {
    const result = await promise;
    console.log(result);
  } catch (error) {
    console.log(error.message);
  }
}
```

The `catch` block will be executed when the promise is `rejected` or when an error is thrown inside the `try` block.

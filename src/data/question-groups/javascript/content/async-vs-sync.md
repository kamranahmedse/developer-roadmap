The difference between Asynchronous and Synchronous code is that Asynchronous code does not block the execution of the program while Synchronous code does.

## Asynchronous code

Asynchronous code is executed in the background and it does not block the execution of the program. It is usually used to perform tasks that take a long time to complete, such as network requests.

```js
console.log('Before');

setTimeout(() => {
  console.log('Hello');
}, 1000);

console.log('After');
```

## Synchronous code

Synchronous code is executed in sequence and it blocks the execution of the program until it is completed. If a task takes a long time to complete, everything else waits.

```js
console.log('Before');

for (let i = 0; i < 1000000000; i++) {}

console.log('After');
```

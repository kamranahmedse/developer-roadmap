You can use `break` and `continue` in loops to alter the flow of the loop. `break` will stop the loop from continuing, and `continue` will skip the current iteration and continue the loop.

```js
for (let i = 0; i < 5; i++) {
  if (i === 1) {
    continue; // skips the rest of the code in the loop
  }
  console.log(`i: ${i}`);
}

// Output:
// i: 0
// i: 2
// i: 3
// i: 4
```

```js
for (let i = 0; i < 5; i++) {
  if (i === 1) {
    break; // stops the loop
  }
  console.log(`i: ${i}`);
}

// Output:
// i: 0
```

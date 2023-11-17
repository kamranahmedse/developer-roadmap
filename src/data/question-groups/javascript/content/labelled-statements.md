JavaScript label statements are used to prefix a label to an identifier. It can be used with `break` and `continue` statement to control the flow more precisely.

```js
loop1: for (let i = 0; i < 5; i++) {
  if (i === 1) {
    continue loop1; // skips the rest of the code in the loop1
  }
  console.log(`i: ${i}`);
}
// Output:
// i: 0
// i: 2
// i: 3
// i: 4
```

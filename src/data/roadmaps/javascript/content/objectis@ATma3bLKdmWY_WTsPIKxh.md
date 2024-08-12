# Object.is

- The Object.is() static method determines whether two values are the same value.
- The Following scenario shows the examples of leveraging the `Object.is`

```js
console.log(Object.is('1', 1));
// Expected output: false

console.log(Object.is(NaN, NaN));
// Expected output: true

console.log(Object.is(-0, 0));
// Expected output: false

const obj = {};
console.log(Object.is(obj, {}));
// Expected output: false
```

- There are few basic assumptions for the `Object.is()` method while using

  The Value returns `true` when

  - Both are `undefined`
  - Both are `null`
  - Both are either `true` (or) `false`
  - Both strings of the same length with the same characters in the same order

Further more details, Pls refer the below MDN doc

- [`Object.is()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is)

The Nullish Coalescing Operator (`??`) returns the right operand if the left one is `null` or `undefined`, otherwise, it returns the left operand. It's useful for setting default values without considering falsy values like `0` or `''` as absent.

```js
console.log(null ?? 'hello'); // hello
console.log(undefined ?? 'hello'); // hello
console.log('' ?? 'hello'); // ''
console.log(0 ?? 'hello'); // 0
```

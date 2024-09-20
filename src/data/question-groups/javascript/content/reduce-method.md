You can use the `reduce()` method to reduce an array to a single value. The `reduce()` method executes a reducer function (that you provide) on each element of the array, resulting in a single output value.

## Syntax

```js
array.reduce((accumulator, currentValue) => {
  // ...
}, initialValue);
```

## Example

You can use the `reduce()` method to sum all the numbers in an array.

```js
const numbers = [1, 2, 3, 4, 5, 6];

const sum = numbers.reduce((accumulator, currentValue) => {
  return accumulator + currentValue;
}, 0);

console.log(numbers); // [1, 2, 3, 4, 5, 6]
console.log(sum); // 21
```

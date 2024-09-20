You can use the `filter()` method to filter an array based on a condition. The `filter()` method creates a new array with all elements that pass the test implemented by the provided function.

```js
const numbers = [1, 2, 3, 4, 5, 6];

const evenNumbers = numbers.filter((number) => {
  return number % 2 === 0;
});

console.log(numbers); // [1, 2, 3, 4, 5, 6]
console.log(evenNumbers); // [2, 4, 6]
```

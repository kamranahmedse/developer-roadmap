# number

The `Number` data type in JavaScript represents floating-point numbers, such as 37 or -9.25. The `Number` constructor provides constants and methods to work with numbers, and values of other types can be converted to numbers using the `Number()` function.

## Example

```js
let num1 = 255; // integer
let num2 = 255.0; // floating-point number with no fractional part
let num3 = 0xff; // hexadecimal notation
let num4 = 0b11111111; // binary notation
let num5 = 0.255e3; // exponential notation

console.log(num1 === num2); // true
console.log(num1 === num3); // true
console.log(num1 === num4); // true
console.log(num1 === num5); // true
```

In this example:

- `255` and `255.0` are equivalent, as JavaScript treats both as the same number.
- `0xff` represents `255` in hexadecimal notation.
- `0b11111111` represents `255` in binary notation.
- `0.255e3` is `255` in exponential notation.
- All these different representations are equal to `255` in JavaScript.

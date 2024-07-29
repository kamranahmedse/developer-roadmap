# undefined

In JavaScript, the undefined value is a primitive type that indicates a variable has been declared but has not yet been assigned a value. It is also a global property of the global object, meaning it is available in the global scope.

### Key Points about undefined:
- `Primitive Value`: `undefined` is a primitive value in JavaScript.
- `Global Property`: `undefined` is a property of the global object.
- `Non-Configurable`: It cannot be changed, overwritten, or deleted.
- `Uninitialized Variables`: Variables declared without a value are automatically assigned `undefined`.
- `Function Return Value`: Functions return `undefined` if they do not explicitly return a value.

#### Example 1: Uninitialized Variable

```JS
let x;
console.log(x); // Output: undefined
```
In this example, `x` is declared but not assigned a value, so its value is `undefined`.

#### Example 2: Function Return Value

```JS
function greet() {
  console.log("Hello!");
}

let result = greet(); // The function does not return a value
console.log(result); // Output: undefined just prints "Hello!" due to console log
```
Here, the `greet` function does not return any value, so the result variable is `undefined`.

#### Example 3: Strict Equality Check

```JS
let y;
if (y === undefined) {
  console.log("y is undefined"); // This statement executes
}
```
This code checks if `y` is `undefined` using strict equality `(===)`.

#### Example 4: `typeof` Operator

```JS
let z;
if (typeof z === "undefined") {
  console.log("z is undefined"); // This statement executes
}
```
The `typeof` operator can also be used to check if a variable is `undefined`. It is useful because it does not throw an error if the variable has not been declared.

#### Example 5: Using the `in` Operator
```JS
if ("a" in window) {
  console.log("a is defined globally");
} else {
  console.log("a is not defined globally"); // This statement executes
}
```
The `in` operator checks if a variable is a property of the global object (window in browsers).

#### Example 6: `void` Operator
```JS
let b;
if (b === void 0) {
  console.log("b is undefined"); // This statement executes
}
```
The `void` operator returns undefined. It is another way to check if a variable is `undefined`.

#### Summary
- `undefined` indicates a variable has been declared but not assigned a value.
- Functions that do not explicitly return a value return `undefined`.
- `undefined` can be checked using `strict` equality `(===)`, `typeof`, the `in` operator, or the `void` operator.

#### Reference
[MDN Reference](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/undefined)

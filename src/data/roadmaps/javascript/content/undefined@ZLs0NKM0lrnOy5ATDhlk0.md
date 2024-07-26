# undefined
The global property `undefined` represents the primitive value `undefined`. It is one of JavaScript's primitive values.

```
// A declared but uninitialized variable has the default value 'undefined'.
var x; 
console.log("Value of x is", x); // Output: Value of x is undefined

// Assign a value to the variable
x = 2;
console.log("Value of x is", x); // Output: Value of x is 2

// 'undefined' is considered false in an 'if' condition
var y;
if (y) {
    console.log("Value of y is", y);
} else {
    console.log("No value", y); // Output: No value undefined
}

You use the isNaN function to check when a value is **"Not a Number."** It attempts to convert the given value to a number and then checks if the result is a NaN. If the value is not a number, it'll return true, but if it is a number, it'll return false.

```javascript
console.log(isNaN("study")); // true

console.log(isNaN(4)); // false
``` 
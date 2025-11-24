You can use the `filter()`, `reduce()` method, and more to remove duplicates from an array. I'll be using the `set()` method as an example:

```javascript
let myArray = [30,30,30,40,50,50,60,60];

let newArray = [...new Set(myArray)]; // removes duplicates and converts back to an array

console.log(newArray); //  [30, 40, 50, 60]
``` 
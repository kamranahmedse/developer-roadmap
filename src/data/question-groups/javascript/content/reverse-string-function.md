You can reverse a string using the `split()`, `reverse()`, and `join()` method.

```javascript
function reverseMyString(str) {
  return str.split("").reverse().join("");
}

let myString = "Learn JavaScript";

let reverseString = reverseMyString(myString);

console.log(reverseString); // tpircSavaJ nraeL
``` 
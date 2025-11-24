There are different ways to check if an object has a specific property. The method you choose depends on what you want to check and why. I'll be using the `Object.hasOwn` method to check if an object has a property that belongs only to it, not to its parent or inherited prototype.

```javascript
var obj = {
        name: "Cess",
        work: "developer",
        countryVisits: 3,
};

console.log(Object.hasOwn(obj, "name")); // true

console.log(Object.hasOwn(obj, "developer")); // false
``` 
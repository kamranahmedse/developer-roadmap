Undefined variables are variables that the developer has declared but not yet assigned a value. 

```javascript
// Example 1

let study;

console.log(study); // undefined var

// Example 2

let myObj = {}; // empty object

console.log(myObj.name); // undefined because name does not exist
```

A null variable is a variable or property that is empty. You use null variables when you want to show that a variable has no values or want to clear the value of a variable.

```javascript
// Example 1

let study = null;

console.log(study); // null

// Example 2

let obj = {
    name: "cess",
};

obj.name = null;

console.log(obj.name); // null
``` 
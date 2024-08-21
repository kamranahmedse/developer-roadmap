# call()

The `call()` method allows you to invoke a function with a given `this` value, and arguments provided individually. 

The `call()` method takes two parameters:

1. `thisArg`: The value to be passed as the `this` parameter to the function being invoked.
2. `...args`: Additional arguments to pass to the function after the `this` argument.

Here's a simple example to illustrate how `call()` works:

```javascript
function greet(greeting) {
  console.log(`${greeting}, ${this.name}!`);
}

const person = {
  name: "John Doe",
};

// Using call to explicitly bind 'this' to the 'person' object
greet.call(person, "Hello"); // Output: Hello, John Doe!
```

- [@article@Understanding Explicit Binding in JavaScript: Call, Bind, and Apply Methods](https://medium.com/@amitsharma_24072/understanding-explicit-binding-in-javascript-call-bind-and-apply-methods-7b6ed0107628)

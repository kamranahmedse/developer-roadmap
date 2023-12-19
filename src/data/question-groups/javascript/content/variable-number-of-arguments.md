In JavaScript, you can accept a variable number of arguments in a function using the `arguments` object or the rest parameter (`...`).

## Using the `arguments` object:

The `arguments` is an array-like object that holds all of the passed arguments. They are only available inside the function body.

```js
function displayArgs() {
  for (let i = 0; i < arguments.length; i++) {
    console.log(arguments[i]);
  }
}
displayArgs(1, 2, 3, 4); // Outputs: 1, 2, 3, 4
```

## Using the rest parameter:

The rest parameter allows you to represent an indefinite number of arguments as an array.

```js
function displayArgs(...args) {
  args.forEach((arg) => console.log(arg));
}
displayArgs(1, 2, 3, 4); // Outputs: 1, 2, 3, 4
```

The rest parameter (`...args` in the example) is generally more modern and flexible, and it provides an actual array, unlike the array-like `arguments` object.

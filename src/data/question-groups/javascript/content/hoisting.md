Hoisting is a JavaScript mechanism where variables and function declarations are moved to the top of their scope before code execution. This means that no matter where the functions and variables are declared, they are moved to the top of their scope regardless of whether their scope is global or local. Note that hoisting only moves the declaration, not the initialization.

```js
console.log(x === undefined); // true
var x = 3;
console.log(x); // 3
```

The above code snippet can be visualized in the following way:

```js
var x;
console.log(x === undefined); // true
x = 3;
console.log(x); // 3
```

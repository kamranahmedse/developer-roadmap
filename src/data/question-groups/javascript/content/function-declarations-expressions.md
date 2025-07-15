A function declaration is a statement used to create functions in JavaScript. It starts with the function keyword followed by the function name and parameters. As long as you stick to the naming conventions, you can provide your function or parameters with any name you want. Also, function declarations are "hoisted," meaning you can call them before they're defined.

```javascript
function functionName(parameters) {
        // Body of the function
}
```

A function expression is also a statement, defining a function as an expression. It starts with you declaring a variable such as let, const, or var, followed by an assignment operator (=), and it doesn't need a name **(an anonymous function)** unless you give it one. Also, they are not "hoisted," meaning you can only use them after you define them, or you'll get an error.

```javascript
let variableName = function(parameters) {
        // Body of the function
}

// The variableName will act as the function name in a function expression.
``` 
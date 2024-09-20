Debugging JavaScript code can be achieved through various methods and tools. Here's a basic guide:

## Console Logging:

You can use `console.log()`, `console.warn()`, `console.error()`, etc., to print values, variables, or messages to the browser's developer console.

```js
console.log('Value of x:', x);
```

## Browser Developer Tools:

Most modern browsers come equipped with developer tools. You can access these tools by pressing `F12` or right-clicking on the web page and selecting `Inspect` or `Inspect Element`.

- **Sources Tab**: Allows you to see the loaded scripts, set breakpoints, and step through the code.
- **Console Tab**: Displays console outputs and allows for interactive JavaScript execution.
- **Network Tab**: Helps in checking network requests and responses.

## Setting Breakpoints:

In the `Sources` tab of the browser's developer tools, you can click on a line number to set a breakpoint. The code execution will pause at this line, allowing you to inspect variables, the call stack, and continue step-by-step.

## Debugger Statement:

Inserting the `debugger;` statement in your code will act as a breakpoint when the browser developer tools are open. Execution will pause at the `debugger;` line.

```js
function myFunction() {
  debugger; // Execution will pause here when dev tools are open
  // ... rest of the code
}
```

## Call Stack and Scope:

In the developer tools, when paused on a breakpoint or `debugger;` statement, you can inspect the `call stack` to see the sequence of function calls. The `Scope` panel will show you the values of local and global variables.

Remember, debugging is an iterative process. It often involves setting breakpoints, checking variables, adjusting code, and re-running to ensure correctness.

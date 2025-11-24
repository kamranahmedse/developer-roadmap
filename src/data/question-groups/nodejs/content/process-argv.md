`process.argv` is an array containing the command-line arguments passed when the Node.js process was launched. The first element is the path to the Node.js executable, the second element is the path to the JavaScript file being executed, and the remaining elements are the command-line arguments.

```js
node index.js hello world
```

```js
console.log(process.argv);
// [
//   '/usr/local/bin/node', -> path to the Node.js executable
//   '/Users/username/projects/nodejs/index.js', -> path to the JavaScript file being executed
//   'hello', -> command-line argument
//   'world' -> command-line argument
// ]
```

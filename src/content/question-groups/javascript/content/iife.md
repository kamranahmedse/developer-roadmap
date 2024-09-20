The IIFE (Immediately Invoked Function Expression) is a JavaScript function that runs as soon as it is defined.

```js
(function () {
  console.log('Hello Roadmap!');
})();
```

The IIFE is frequently used to create a new scope to avoid variable hoisting from within blocks.

```js
(function () {
  var roadmap = 'JavaScript';
  console.log(roadmap);
})();

console.log(roadmap); // ReferenceError: name is not defined
```

# global keyword

In browsers, the top-level scope is the global scope, and its global object is called the `window` object. Within the browser, `var something` will define a new global variable inside the `window` object. In Node.js, this is different. The top-level scope is **not** the global scope; `var something` inside a Node.js module will be local to that module.

Visit the following resources to learn more:

- [@official@global Keyword in Node.js](https://nodejs.org/api/globals.html#global)
- [@article@What is the 'global' object in NodeJS](https://stackoverflow.com/questions/43627622/)
- [@video@What is Global Object?](https://www.youtube.com/watch?v=jn8PZNBmKm0)
- [@video@Global Object in Node](https://www.youtube.com/watch?v=PY-AycMkEAg)

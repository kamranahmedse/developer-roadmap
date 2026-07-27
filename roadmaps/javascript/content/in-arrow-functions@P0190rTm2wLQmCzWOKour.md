# in arrow functions
 
Arrow functions do not have their own `this` binding. Instead, they inherit `this` from the lexical scope where they were defined. This makes arrow functions predictable in callbacks and event handlers where regular functions would lose their intended `this` context.

Visit the following resources to learn more:

- [@article@this keyword and arrow function](https://stackoverflow.com/questions/66518020/javascript-this-keyword-and-arrow-function)
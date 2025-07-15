Arrow functions are a shorter way to write functions in JavaScript, which came out in ES6 2015. It uses an arrow (`=>`) symbol to define (create) a function instead of the function keyword. Arrow functions bind "this'' to the surrounding scope. This means they inherit the same meaning of the "this" keyword as the code around them. It makes it easier to work with variables, functions, objects, etc., outside the arrow function, but still accessible within it.

Regular functions, on the other hand, bind the "this" keyword to the function itself. The "this" keyword changes based on how you call the function, but it can sometimes cause errors. For example, if you call a regular function as a method of an object, "this" will refer to that object. But if you call the same function as a standalone function, "this" will refer to the global object **(usually the window object in a browser)**.

```javascript
// arrow function with this

function personName(name) {
  this.name = name; 
  this.sayName = () => {
  console.log(this.name); // 'this' is inherited from the surrounding context (constructor function: personName)
  };
}

const cess = new personName("cess");

cess.sayName(); // cess

// regular function with this

function Person(name) {
  this.name = name; // Assigns the "name" parameter as the "name" property of the object you created.

  this.sayName = function () {

console.log(this.name); // Refers to the "name" property of the object that calls this function.
  };
}

const cess = new Person("cess");

cess.sayName(); // cess
```

In arrow functions, if there is only one expression, you can skip the curly braces `{}` and the return keyword. It makes your code cleaner and easier for you and external developers to read. If you have two or more expressions, use the return keyword and put your code in curly braces `{}`**.**

```javascript
// regular function

function doMath(a,b) {
    return a + b;
}

console.log(doMath(200, 500)); // 700

// arrow function 

const doMath = (a, b) => a + b; // single expression

console.log(doMath(200, 500)); // 700

// multiple expression

let doMath = (a, b) => {
  let result = a * b;
  return result;
};

console.log(doMath(200, 500)); // 100,000
``` 
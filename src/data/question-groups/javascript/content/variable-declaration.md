A variable declaration is when you create a variable to store a value in JavaScript. You give it a descriptive name, which you can then use to store or retrieve the value. In JavaScript, you use **var, let, and const** keywords to declare variables.

![JavaScript interview questions: Declaring variables](https://assets.roadmap.sh/guest/variable-declarations-in-javascript-r8f7v.png)

Older versions of JavaScript used the var keyword to declare variables**.** Variables declared using the var keyword have a function scope. It lets you give variables the same name and a new value even in the same scope. However, it may result in confusion and errors, making debugging your code difficult.

```javascript
var course = "java";

var course = "JavaScript interview questions"; // No error

console.log(course); // JavaScript interview questions
```

The let keyword is a new way to declare variables in JavaScript in ECMAScript 2015 (ES6). Variables declared using the let keyword have a block scope. You can change the value, but you can't use the same name for a variable in the same block scope. It helps make debugging code easier compared to the var keyword.

```javascript
let course = "java";

let course = "JavaScript interview questions"; 

console.log(course);// Identifier 'course' has already been declared



// Example 2

let course = "java";

course = "JavaScript interview questions"; 

console.log(course);// JavaScript interview questions
```

The const keyword works as the let keyword since both are block-scoped. However, you cannot change the value or use the same name for a variable in the same scope.

```javascript
const course = "java";

course = "JavaScript interview questions"; 

// Error: Assignment to constant variable.
``` 
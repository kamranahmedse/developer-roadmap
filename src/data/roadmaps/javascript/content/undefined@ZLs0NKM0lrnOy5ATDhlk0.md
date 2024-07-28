# undefined
In JavaScript, undefined is a primitive value that represents the absence of a value. When a variable is declared but not assigned a value, it is automatically initialized with the value undefined. It is one of the fundamental building blocks in JavaScript and is crucial for understanding how variables and functions work in the language.
Here are some common scenarios where undefined appears:

## 1. Variable Declaration:

let a;
console.log(a); // undefined

## 2. Function Parameters:

function greet(name) {
  console.log(name);
}
greet(); // undefined

## 3. Object Properties:

const person = {};
console.log(person.age); // undefined

## 4. Return Value of Functions Without a Return Statement:


function doSomething() {}
console.log(doSomething()); // undefined

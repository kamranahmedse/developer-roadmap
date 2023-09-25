---
order: 1
briefTitle: 'JavaScript'
briefDescription: 'Test, rate and improve your JavaScript knowledge with these questions.'
title: 'JavaScript Questions'
description: 'Test, rate and improve your JavaScript knowledge with these questions.'
isNew: true
seo:
  title: 'JavaScript Questions'
  description: 'Curated list of JavaScript questions to test, rate and improve your knowledge. Questions are based on real world experience and knowledge.'
  keywords:
    - 'javascript quiz'
    - 'javascript questions'
    - 'javascript interview questions'
    - 'javascript interview'
    - 'javascript test'
sitemap:
  priority: 1
  changefreq: 'monthly'
questions:
  - question: What is JavaScript?
    answer: JavaScript (often abbreviated as JS) is a high-level, versatile, and widely-used programming language primarily known for its role in web development. It enables interactive and dynamic behavior on websites.
    topics:
      - 'Core'
      - 'Beginner'
  - question: What is the difference between `var`, `let`, and `const` in JavaScript?
    answer: In JavaScript, `var` is function-scoped and was traditionally used to declare variables. `let` and `const` are block-scoped. The key difference between `let` and `const` is that `let` allows for reassignment while `const` creates a read-only reference.
    topics:
      - 'Core'
      - 'Beginner'
  - question: What is the difference between `null` and `undefined`?
    answer: The `null` is an assignment value. It can be assigned to a variable as a representation of no value. But the `undefined` is a primitive value that represents the absence of a value, or a variable that has not been assigned a value.
    topics:
      - 'Core'
      - 'Beginner'
  - question: What is the difference between `==` and `===`?
    answer: equality-operator.md
    topics:
      - 'Core'
      - 'Beginner'
  - question: What are the different ways to declare a variable in JavaScript?
    answer: There are three ways to declare a variable in JavaScript `var`, `let`, and `const`.
    topics:
      - 'Core'
      - 'Intermediate'
  - question: What are Scopes in JavaScript?
    answer: A scope is a set of variables, objects, and functions that you have access to. There are three types of scopes in JavaScript. Which are Global Scope, Function Scope (Local Scope), and Block Scope.
    topics:
      - 'Core'
      - 'Intermediate'
  - question: What is ternary operator in JavaScript?
    answer: ternary-operator.md
    topics:
      - 'Core'
      - 'Intermediate'
  - question: How to implement your own Custom Event in JavaScript?
    answer: custom-event.md
    topics:
      - 'Core'
      - 'DOM'
      - 'Advanced'
  - question: What is a closure in JavaScript?
    answer: closure.md
    topics:
      - 'Core'
      - 'Advanced'
  - question: Does Arrow functions have their own `this`?
    answer: No, arrow functions do not have their own `this`. Instead, they inherit the `this` of the enclosing lexical scope.
    topics:
      - 'Core'
      - 'Intermediate'
  - question: Does `map()` method mutate the original array?
    answer: map-method.md
    topics:
      - 'Core'
      - 'Intermediate'
  - question: Does `forEach()` method return a new array?
    answer: for-each-method.md
    topics:
      - 'Core'
      - 'Intermediate'
  - question: How to use `filter()` method?
    answer: filter-method.md
    topics:
      - 'Core'
      - 'Intermediate'
  - question: What is the difference between `map()` and `forEach()` methods?
    answer: The `map()` method creates a new array with the results of calling a provided function on every element in the calling array. Whereas, the `forEach()` method executes a provided function once for each array element.
    topics:
      - 'Core'
      - 'Intermediate'
  - question: How to use `reduce()` method?
    answer: reduce-method.md
    topics:
      - 'Core'
      - 'Intermediate'
  - question: What is the difference between `map()` and `reduce()` methods?
    answer: The `map()` method creates a new array with the results of calling a provided function on every element in the calling array. Whereas, the `reduce()` method executes a reducer function (that you provide) on each element of the array, resulting in a single output value.
    topics:
      - 'Core'
      - 'Intermediate'
  - question: What is Prototype Chain in JavaScript?
    answer: prototype-chain.md
    topics:
      - 'OOP'
      - 'Advanced'
  - question: What is IIFE in JavaScript?
    answer: iife.md
    topics:
      - 'Core'
      - 'Advanced'
  - question: What is Inheritance in JavaScript?
    answer: inheritance.md
    topics:
      - 'OOP'
      - 'Advanced'
  - question: What is Map in JavaScript?
    answer: map.md
    topics:
      - 'Core'
      - 'Beginner'
  - question: What is Set in JavaScript?
    answer: set.md
    topics:
      - 'Core'
      - 'Beginner'
  - question: How you can find unique values in an array?
    answer: find-unique-array-values.md
    topics:
      - 'Core'
      - 'Intermediate'
  - question: What is a JavaScript promise?
    answer: A Promise in JavaScript represents a value that may not be available yet but will be at some point. Promises provide a way to handle asynchronous operations, offering methods like `.then()` and `.catch()` to register callbacks for success and failure.
    topics:
      - 'Core'
      - 'Advanced'
  - question: What is the purpose of the `async/await` in JavaScript?
    answer: The `async/await`, introduced in ES2017, provides a more readable and cleaner way to handle asynchronous operations compared to callbacks and promises. An `async` function always returns a promise, and within such a function, you can use `await` to pause execution until a promise settles.
    topics:
      - 'Core'
      - 'Advanced'
  - question: What is callback hell in JavaScript?
    answer: callback-hell.md
    topics:
      - 'Core'
      - 'Advanced'
  - question: How to enable strict mode in JavaScript?
    answer: To enable strict mode in JavaScript, you need to add the following line at the top of the file or function `'use strict';`.
    topics:
      - 'Core'
      - 'Beginner'
  - question: Explain `alert()`, `prompt()`, and `confirm()` methods in JavaScript?
    answer: alert-prompt-confirm.md
    topics:
      - 'Core'
      - 'Intermediate'
  - question: How to handle event bubbling in JavaScript?
    answer: event-bubbling.md
    topics:
      - 'Core'
      - 'Beginner'
  - question: What is Event Capturing in JavaScript?
    answer: Event capturing is the first phase of event propagation. In this phase, the event is captured by the outermost element and propagated to the inner elements. It is also known as trickling. It is the opposite of event bubbling.
    topics:
      - 'Core'
      - 'DOM'
      - 'Beginner'
  - question: What is the spread operator in JavaScript?
    answer: spread-operator.md
    topics:
      - 'Core'
      - 'Intermediate'
  - question: Is Java and JavaScript the same?
    answer: No, Java and JavaScript are distinct languages. Their similarity in name is coincidental, much like `car` and `carpet`. Java is often used for backend and mobile apps, while JavaScript powers web interactivity and backend.
    topics:
      - 'Core'
      - 'Beginner'
  - question: What is `preventDefault()` method in JavaScript?
    answer: prevent-default.md
    topics:
      - 'Core'
      - 'DOM'
      - 'Intermediate'
  - question: What is Hoisting in JavaScript?
    answer: hoisting.md
    topics:
      - 'Core'
      - 'Intermediate'
  - question: What is DOM?
    answer: The Document Object Model (DOM) is a programming interface for HTML and XML documents. It represents the page so that programs can change the document structure, style, and content. The DOM represents the document as nodes and objects.
    topics:
      - 'DOM'
      - 'Beginner'
  - question: Difference between `Promise.all()` and `Promise.allSettled()`?
    answer: promise-all-vs-all-settled.md
    topics:
      - 'Core'
      - 'Advanced'
  - question: What is the difference between `Map` and `WeakMap` in JavaScript?
    answer: The `Map` object holds key-value pairs and remembers the original insertion order of the keys. Whereas, the `WeakMap` object is a collection of key/value pairs in which the keys are weakly referenced. You can use any data type as a key or value in a `Map` whereas in `WeakMap` you can only use objects as keys. The `WeakMap` is not iterable whereas `Map` is. In `WeakMap` it holds the weak reference to the original object which means if there are no other references to an object stored in the `WeakMap`, those objects can be garbage collected.
    topics:
      - 'Core'
      - 'Advanced'
  - question: Garbage collection in JavaScript?
    answer: The JavaScript engine uses automatic garbage collection. JavaScript automatically manages memory by freeing up space used by objects no longer needed. This algorithm is called Mark and Sweep, which is performed periodically by the JavaScript engine.
    topics:
      - 'Core'
      - 'Advanced'
  - question: How to make an Object immutable in JavaScript?
    answer: immutable-object.md
    topics:
      - 'Core'
      - 'Advanced'
  - question: What is Type Casting?
    answer: Type conversion (or typecasting) means transfer of data from one data type to another. Implicit conversion happens when the compiler (for compiled languages) or runtime (for script languages like `JavaScript`) automatically converts data types.
    topics:
      - 'Core'
      - 'Intermediate'
  - question: What are Explicit binding in JavaScript?
    answer: explicit-binding.md
    topics:
      - 'Core'
      - 'Advanced'
  - question: How to run a piece of code after a specific time interval?
    answer: set-interval.md
    topics:
      - 'Core'
      - 'Beginner'
  - question: How to run a piece of code only once after a specific time?
    answer: set-timeout.md
    topics:
      - 'Core'
      - 'Beginner'
  - question: What are Labelled Statements in JavaScript?
    answer: labelled-statements.md
    topics:
      - 'Core'
      - 'Intermediate'
  - question: Difference between `defer` and `async` attributes in JavaScript?
    answer: defer-vs-async.md
    topics:
      - 'Core'
      - 'Beginner'
  - question: What is Increment operator in JavaScript?
    answer: increment-operator.md
    topics:
      - 'Core'
      - 'Beginner'
  - question: How to accept variable number of arguments in a JavaScript function?
    answer: variable-number-of-arguments.md
    topics:
      - 'Core'
      - 'Intermediate'
  - question: How to define multiline strings in JavaScript?
    answer: In order to define multiline strings in JavaScript, you need to use template literals. Template literals are enclosed by the backtick (```` ` ` ````) character instead of double or single quotes. Template literals can contain placeholders. These are indicated by the dollar sign and curly braces (``` `${expression}` ```).
    topics:
      - 'Core'
      - 'Beginner'
  - question: Uses of `break` and `continue` statements in JavaScript?
    answer: break-and-continue.md
    topics:
      - 'Core'
      - 'Beginner'
  - question: How to parse JSON in JavaScript?
    answer: parse-json.md
    topics:
      - 'Core'
      - 'Beginner'
  - question: How to debug JavaScript code?
    answer: debug-javascript.md
    topics:
      - 'Core'
      - 'Beginner'
---

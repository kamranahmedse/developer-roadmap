---
order: 1
briefTitle: 'Node.js'
briefDescription: 'Test, rate and improve your Node.js knowledge with these questions.'
title: 'Node.js Questions'
description: 'Test, rate and improve your Node.js knowledge with these questions.'
isNew: false
seo:
  title: 'Node.js Questions'
  description: 'Curated list of Node.js questions to test, rate and improve your knowledge. Questions are based on real world experience and knowledge.'
  ogImageUrl: 'https://assets.roadmap.sh/guest/nodejs-questions-x6n2w.jpg'
  keywords:
    - 'node.js quiz'
    - 'node.js questions'
    - 'node.js interview questions'
    - 'node.js interview'
    - 'node.js test'
sitemap:
  priority: 1
  changefreq: 'monthly'
questions:
  - question: What is Node.js?
    answer: Node.js is an open-source and cross-platform JavaScript runtime built on Chrome's V8 JavaScript engine. Node.js uses an event-driven, non-blocking I/O model that makes it lightweight and efficient.
    topics:
      - 'Core'
      - 'Beginner'
  - question: What is REPL in Node.js?
    answer: |
      REPL stands for Read-Eval-Print-Loop. It is an interactive shell that allows you to execute JavaScript code and view the output immediately. It is useful for testing small snippets of code and experimenting with the Node.js API.
    topics:
      - 'Core'
      - 'Beginner'
  - question: What is the difference between Node.js and JavaScript?
    answer: Node.js is a runtime environment for JavaScript. JavaScript is a programming language used to create web applications. Node.js is a runtime environment that can execute JavaScript code outside of a web browser.
    topics:
      - 'Core'
      - 'Beginner'
  - question: What is Event Loop in Node.js?
    answer: |
      The event loop is a single-threaded loop responsible for handling all asynchronous tasks in Node.js. It continuously checks for events and executes associated callback functions, allowing Node.js to handle asynchronous tasks efficiently. Its non-blocking I/O model ensures that it can process multiple operations simultaneously without waiting for one to complete before moving on to the next, contributing to its scalability and performance. [Watch this video](https://www.youtube.com/watch?v=8aGhZQkoFbQ) to learn more about the topic.
    topics:
      - 'Core'
      - 'Intermediate'
  - question: What is the difference between Node.js and AJAX?
    answer: |
      Node.js is a server-side runtime for JavaScript, while AJAX is a client-side technique for asynchronous communication with the server.
    topics:
      - 'Core'
      - 'Beginner'
  - question: What are modules in Node.js?
    answer: |
      Modules are reusable blocks of code that can be imported into other files. They are used to encapsulate related code into a single unit of code that can be used in other parts of the program. It allow us to split our code into multiple files and reuse it across multiple files. Some built-in modules include `fs`, `http`, `path`, `url`, `util`, etc.
    topics:
      - 'Core'
      - 'Beginner'
  - question: Difference between CommonJS and ESM?
    answer: commonjs-vs-esm.md
    topics:
      - 'Core'
      - 'Intermediate'
  - question: What is the `global` object in Node.js?
    answer: |
      The `global` object is a global namespace object that contains all global variables, functions, and objects. It is similar to the `window` object in the browser. It can be accessed from anywhere in the program without importing it.
    topics:
      - 'Core'
      - 'Intermediate'
  - question: What is the difference between `process.nextTick()` and `setImmediate()`?
    answer: |
      `process.nextTick()` and `setImmediate()` are both used to schedule a callback function to be executed in the next iteration of the event loop. The difference is that `process.nextTick()` executes the callback at the end of the current iteration of the event loop, while `setImmediate()` executes the callback at the beginning of the next iteration of the event loop.
    topics:
      - 'Core'
      - 'Intermediate'
  - question: What is `setInterval()`?
    answer: |
      `setInterval()` is a global function that helps you execute a function repeatedly at a fixed delay. It returns an interval ID that uniquely identifies the interval, which can be used to cancel the interval using the `clearInterval()` function.
    topics:
      - 'Core'
      - 'Beginner'
  - question: What is `setTimeout()`?
    answer: |
      `setTimeout()` is a global function that helps you execute a function after a specified delay. It returns a timeout ID that uniquely identifies the timeout, which can be used to cancel the timeout using the `clearTimeout()` function.
    topics:
      - 'Core'
      - 'Beginner'
  - question: What are Event Emitters in Node.js?
    answer: |
      Event Emitters is a class that can be used to emit named events and register listeners for those events. It is used to handle asynchronous events in Node.js.
    topics:
      - 'Core'
      - 'Intermediate'
  - question: What is `npm`?
    answer: |
      `npm` is a package manager for Node.js. It is used to install, update, and remove packages from the Node.js ecosystem. It is also used to manage dependencies for Node.js projects.
    topics:
      - 'Core'
      - 'Beginner'
  - question: What is the full form of `npm`?
    answer: |
      `npm` stands for Node Package Manager.
    topics:
      - 'Core'
      - 'Beginner'
  - question: What is `npx`?
    answer: |
      `npx` is a tool that allows you to run Node.js packages without installing them. It is used to execute Node.js packages that are not installed globally.
    topics:
      - 'Core'
      - 'Beginner'
  - question: What is `process.cwd()`?
    answer: |
      `process.cwd()` returns the current working directory of the Node.js process. It is similar to `pwd` in Unix.
    topics:
      - 'Core'
      - 'Intermediate'
  - question: What is the difference between `process.cwd()` and `__dirname`?
    answer: process-cwd-vs-dirname.md
    topics:
      - 'Core'
      - 'Intermediate'
  - question: What is `__filename`?
    answer: |
      `__filename` is a global variable that contains the absolute path of the current file.
    topics:
      - 'Core'
      - 'Intermediate'
  - question: What is `process.argv`?
    answer: process-argv.md
    topics:
      - 'Core'
      - 'Intermediate'
  - question: What is the purpose of `fs` module?
    answer: |
      The File System (fs) module is used to perform file operations such as reading, writing, and deleting files. All file system operations have synchronous and asynchronous forms.
    topics:
      - 'Core'
      - 'Beginner'
  - question: What is the purpose of `path` module?
    answer: |
      The Path module is used to perform operations on file and directory paths. It provides methods for resolving and normalizing paths, joining paths, and extracting file and directory names.
    topics:
      - 'Core'
      - 'Beginner'
  - question: How to read a file in Node.js?
    answer: |
      The `fs.readFile()` method is used to read the contents of a file asynchronously. It takes the path of the file to be read and a callback function as arguments. The callback function is called with two arguments, `err` and `data`. If an error occurs while reading the file, the `err` argument will contain the error object. Otherwise, the `data` argument will contain the contents of the file.
    topics:
      - 'Core'
      - 'Beginner'
  - question: How to load environment variables from a `.env` file in Node.js?
    answer: |
      The `dotenv` package is used to load environment variables from a `.env` file into `process.env`. It is used to store sensitive information such as API keys, database credentials, etc. in a `.env` file instead of hardcoding them in the source code.
    topics:
      - 'Core'
      - 'Beginner'
  - question: How to access environment variables in Node.js?
    answer: |
      Environment variables can be accessed using the `process.env` object. It is an object that contains all the environment variables defined in the current process.
    topics:
      - 'Core'
      - 'Beginner'
  - question: How to take user input from the command line in Node.js?
    answer: input-from-command-line.md
    topics:
      - 'CLI'
      - 'Beginner'
  - question: How to create a web server in Node.js?
    answer: web-server.md
    topics:
      - 'Core'
      - 'Beginner'
  - question: What are streams in Node.js?
    answer: |
      Streams are objects that allow you to read data from a source or write data to a destination in a continuous manner. They are used to handle large amounts of data efficiently.
    topics:
      - 'Core'
      - 'Advanced'
  - question: What is difference between `fork` and `spawn` methods of `child_process` module?
    answer: |
      The `fork` method is used when you want to run another JavaScript file in a separate worker. It's like having a friend with a specific task. You can communicate with them via messages and they can send messages back to you. The `spawn` method is used when you want to run a command in a separate process. It's like asking someone to do a specific. You can communicate with them via stdin/stdout/stderr, but it's more like giving orders and getting results.
    topics:
      - 'Core'
      - 'Advanced'
  - question: What is the `os` module?
    answer: |
      The `os` module provides methods for interacting with the operating system. It can be used to get information about the operating system, such as the hostname, platform, architecture, etc.
    topics:
      - 'Core'
      - 'Intermediate'
  - question: Can you access the DOM in Node.js?
    answer: |
      No, you cannot access the DOM in Node.js because it does not have a DOM. It is a server-side runtime for JavaScript, so it does not have access to the browser's DOM.
    topics:
      - 'Core'
      - 'Intermediate'
  - question: What is Clustering in Node.js?
    answer: |
      Clustering is a technique used to distribute the load across multiple processes. It is used to improve the performance and scalability of Node.js applications.
    topics:
      - 'Core'
      - 'Advanced'
  - question: How can memory leaks happen in Node.js?
    answer: |
      Memory leaks happen when a program allocates memory but does not release it when it is no longer needed. This can happen due to bugs in the program or due to the way the program is designed. In Node.js, memory leaks can happen due to the use of closures, circular references, and global variables.
    topics:
      - 'Core'
      - 'Intermediate'
  - question: What is the order priority of `process.nextTick`, `Promise`, `setTimeout`, and `setImmediate`?
    answer: order-priority.md
    topics:
      - 'Core'
      - 'Intermediate'
  - question: What is `process.exit()`?
    answer: |
      `process.exit()` is a method that can be used to exit the current process. It takes an optional exit code as an argument. If no exit code is specified, it defaults to 0.
    topics:
      - 'Core'
      - 'Intermediate'
  - question: Different exit codes in Node.js?
    answer: exit-codes.md
    topics:
      - 'Core'
      - 'Intermediate'
  - question: How Node.js handle errors?
    answer: error-handling.md
    topics:
      - 'Core'
      - 'Intermediate'
---

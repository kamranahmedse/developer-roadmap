# Nodejs error handling

 Error handling in Node.js is a mandatory step. A Node.js developer may work with both synchronous and asynchronous functions simultaneously. Handling errors in asynchronous functions is important because their behavior may vary, unlike synchronous functions. While try-catch blocks are effective for synchronous functions, asynchronous functions can be dealt with callbacks, promises, and async-await. Try-catch is synchronous means that if an asynchronous function throws an error in a synchronous try/catch block, no error throws. Errors thrown in Node.js applications can be handled in the following ways:

1. Using try-catch block
2. Using callbacks
3. Using promises and promise callbacks
4. Using async-await

1) Using try-catch block: The try-catch block can be used to handle errors thrown by a block of code.
2) Using callbacks: A callback is a function called at the completion of a certain task. Callbacks are widely used in Node.js as it prevents any blocking, and allows other code to be run in the meantime. The program does not wait for file reading to complete and proceeds to print “Program Ended” while continuing to read the file. If any error occurs like file does not exist in the system then the error is printed after “Program Ended”, else the content of the file is outputted.
3) Using promises and promise callbacks: Promises are an enhancement to Node.js callbacks. When defining the callback, the value which is returned is called a “promise”. The key difference between a promise and a callback is the return value. There is no concept of a return value in callbacks. The return value provides more control for defining the callback function. In order to use promises, the promise module must be installed and imported in the application. The .then clause handles the output of the promise. If an error occurs in any .then clause or if any of the promises above rejects, it is passed to the immediate .catch clause. In case of a promise being rejected, and there is no error handler then the program terminates.
4) Using async-await: Async-await is a special syntax to work with promises in a simpler way that is easy to understand. When we use async/await, .then is replaced by await which handles the waiting in the function. The error handling is done by the .catch clause. Async-await can also be wrapped in a try-catch block for error handling. In case no error handler exists the program terminates due to uncaught error.


<ResourceGroupTitle>Free Content</ResourceGroupTitle>
<BadgeLink colorScheme='yellow' badgeText='Read' href='https://www.geeksforgeeks.org/how-to-handle-errors-in-node-js/'>How to handle errors in node.js ?</BadgeLink>
<BadgeLink colorScheme='yellow' badgeText='Read' href='https://www.tutorialspoint.com/understanding-the-different-error-types-and-handling-in-node-js'>
  Understanding the different error types and handling in Node.js</BadgeLink>

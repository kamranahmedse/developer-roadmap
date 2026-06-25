# Uncaught Exceptions
 
An uncaught exception is an error that is not handled anywhere in the application, causing the Node.js process to crash. You can listen for these with the `process.on('uncaughtException', ...)` event, though it should be used carefully and mainly for logging before shutting down gracefully. Relying on it as a catch-all is considered bad practice.

Visit the following resources to learn more:

- [@official@Uncaught Exception Error Events](https://nodejs.org/api/process.html#event-uncaughtexception)
- [@article@Let It Crash: Best Practices for Handling Node.js Errors on Shutdown](https://blog.heroku.com/best-practices-nodejs-errors)
- [@article@Uncaught Exceptions in Node.js](https://shapeshed.com/uncaught-exceptions-in-node/)
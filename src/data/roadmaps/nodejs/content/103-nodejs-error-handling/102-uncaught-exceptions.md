# Uncaught Exceptions

When a JavaScript error is not properly handled, an uncaughtException is emitted. These suggest the programmer has made an error, and they should be treated with the utmost priority.

The correct use of `uncaughtException` is to perform synchronous cleanup of allocated resources (e.g. file descriptors, handles, etc) before shutting down the process. It is not safe to resume normal operation after `uncaughtException` because system becomes corrupted. The best way is to let the application crash, log the error and then restart the process automatically using nodemon or pm2.

Visit the following resources to learn more:

- [@official@Uncaught Exception Error Events](https://nodejs.org/api/process.html#event-uncaughtexception)
- [@article@Let It Crash: Best Practices for Handling Node.js Errors on Shutdown](https://blog.heroku.com/best-practices-nodejs-errors)
- [@article@Uncaught Exceptions in Node.js](https://shapeshed.com/uncaught-exceptions-in-node/)

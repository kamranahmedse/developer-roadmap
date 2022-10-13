# Uncaught Exceptions

When a JavaScript error is not properly handled, an uncaughtException is emitted. These suggest the programmer has made an error, and they should be treated with the utmost priority.

The correct use of 'uncaughtException' is to perform synchronous cleanup of allocated resources (e.g. file descriptors, handles, etc) before shutting down the process. It is not safe to resume normal operation after 'uncaughtException'.

<ResourceGroupTitle>Free Content</ResourceGroupTitle>
<BadgeLink colorScheme='blue' badgeText='Official Website' href='https://nodejs.org/api/process.html#event-uncaughtexception'>Official Website</BadgeLink>
<BadgeLink colorScheme='yellow' badgeText='Read' href='https://blog.heroku.com/best-practices-nodejs-errors'>Let It Crash: Best Practices for Handling Node.js Errors on Shutdown</BadgeLink>
<BadgeLink colorScheme='yellow' badgeText='Read' href='https://shapeshed.com/uncaught-exceptions-in-node/'>Uncaught Exceptions in Node.js</BadgeLink>

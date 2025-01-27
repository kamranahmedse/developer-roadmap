# Synchronous I/O

Blocking the calling thread while I/O completes can reduce performance and affect vertical scalability.

A synchronous I/O operation blocks the calling thread while the I/O completes. The calling thread enters a wait state and is unable to perform useful work during this interval, wasting processing resources.

Common examples of I/O include:

- Retrieving or persisting data to a database or any type of persistent storage.
- Sending a request to a web service.
- Posting a message or retrieving a message from a queue.
- Writing to or reading from a local file.

This antipattern typically occurs because:

- It appears to be the most intuitive way to perform an operation.
- The application requires a response from a request.
- The application uses a library that only provides synchronous methods for I/O.
- An external library performs synchronous I/O operations internally. A single synchronous I/O call can block an entire call chain.

Visit the following links to learn more:

- [@article@What is Synchronous I/O antipattern?](https://learn.microsoft.com/en-us/azure/architecture/antipatterns/synchronous-io/)

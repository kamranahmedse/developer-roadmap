# Synchronous I/O
 
Synchronous I/O blocks the calling thread until an input or output operation, like a network call or disk read, completes. Under high load, this ties up threads waiting on slow operations instead of doing useful work, which limits how many concurrent requests a system can handle. Switching to asynchronous I/O lets a thread continue other work while waiting for the operation to finish.

Visit the following resources to learn more:

- [@article@What is Synchronous I/O antipattern?](https://learn.microsoft.com/en-us/azure/architecture/antipatterns/synchronous-io/)
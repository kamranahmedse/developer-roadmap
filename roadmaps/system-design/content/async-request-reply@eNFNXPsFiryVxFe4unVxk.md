# Async Request Reply
 
The async request-reply pattern decouples a client's request from the actual processing time of a backend operation, useful when that operation takes longer than a typical HTTP request should wait for. The client gets an immediate acknowledgment along with a way to check status later, such as a polling endpoint or callback. This avoids holding a connection open for long-running operations.

Visit the following resources to learn more:

- [@article@Asynchronous Request-Reply pattern](https://learn.microsoft.com/en-us/azure/architecture/patterns/async-request-reply)
# Synchronous vs Asynchronous APIs

When designing APIs, one critical decision is whether to create a synchronous or asynchronous API. Synchronous APIs are those that hold a connection open and wait for a response before moving on, hence operating in a sequential manner. This can lead to efficient, simple-to-understand coding but can pose performance issues when dealing with long tasks since the caller has to wait until the process finishes.

On the other hand, Asynchronous APIs do not wait for a response before moving on to the next task, allowing multiple operations to be executed simultaneously. This can result in improved performance and responsiveness especially in applications that need to handle multiple requests concurrently. However, coding for asynchronous APIs can be complex due to issues such as race conditions and callbacks. Understanding the differences between these two types of API design is crucial for creating efficient and effective APIs.

Learn more from the following resources:

- [@article@Asynchronous APIs — Everything You Need to Know](https://blog.hubspot.com/website/asynchronous-api)
- [@article@The Differences Between Synchronous and Asynchronous APIs](https://nordicapis.com/the-differences-between-synchronous-and-asynchronous-apis/)
- [@article@Understanding Asyncronous APIs](https://blog.postman.com/understanding-asynchronous-apis/)
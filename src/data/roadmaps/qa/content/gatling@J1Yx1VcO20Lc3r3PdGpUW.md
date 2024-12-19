# Gatling

Gatling is a highly capable load testing tool. It is designed for ease of use, maintainability and high performance. Out of the box, Gatling comes with excellent support of the HTTP protocol that makes it a tool of choice for load testing any HTTP server. As the core engine is actually protocol agnostic, it is perfectly possible to implement support for other protocols. For example, Gatling currently also ships JMS support.

Gatling’s architecture is asynchronous as long as the underlying protocol, such as HTTP, can be implemented in a non blocking way. This kind of architecture lets us implement virtual users as messages instead of dedicated threads, making them very resource cheap. Thus, running thousands of concurrent virtual users is not an issue.

Visit the following resources to learn more:

- [@official@Gatling](https://gatling.io/)
- [@video@Learn Gatling](https://www.youtube.com/playlist?list=PLJ9A48W0kpRJE6s8I1MjWm-z8BGbUYNCw)

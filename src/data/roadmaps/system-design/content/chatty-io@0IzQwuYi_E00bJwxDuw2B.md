# Chatty I/O

The cumulative effect of a large number of I/O requests can have a significant impact on performance and responsiveness.

Network calls and other I/O operations are inherently slow compared to compute tasks. Each I/O request typically has significant overhead, and the cumulative effect of numerous I/O operations can slow down the system. Here are some common causes of chatty I/O.

- Reading and writing individual records to a database as distinct requests
- Implementing a single logical operation as a series of HTTP requests
- Reading and writing to a file on disk

To learn more, visit the following links:

- [@article@Chatty I/O antipattern](https://learn.microsoft.com/en-us/azure/architecture/antipatterns/chatty-io/)

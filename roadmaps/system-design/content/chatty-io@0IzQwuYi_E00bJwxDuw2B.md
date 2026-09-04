# Chatty I/O
 
Chatty I/O refers to a pattern where an application makes many small, frequent calls to a resource, like a database or another service, instead of batching them into fewer, larger calls. Each individual call carries overhead, and this overhead adds up quickly at scale. Batching requests reduces the total number of round trips needed.

Visit the following resources to learn more:

- [@article@Chatty I/O antipattern](https://learn.microsoft.com/en-us/azure/architecture/antipatterns/chatty-io/)
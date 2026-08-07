# Pipelining

Pipelining in Redis is a technique that allows clients to send multiple commands to the server without waiting for individual responses after each command. Instead, the commands are sent in a batch, and responses are read together at the end. This reduces the network overhead and latency associated with multiple round trips, significantly improving throughput, especially in high-volume operations.

Visit the following resources to learn more:

- [@official@Redis Pipelining](https://redis.io/docs/latest/develop/use/pipelining/)
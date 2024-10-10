# Batch Operations

Batch operations in Redis allow you to execute multiple commands efficiently in a single network round-trip. While Redis does not have true batching like some databases (where a set of operations are sent together and processed atomically), it provides ways to send multiple commands together to reduce the overhead of individual network requests. These include Pipelining, Transactions (MULTI/EXEC), and Lua Scripting.

Learn more from the following resources:

- [@article@Using pipelining to batch issue commands](https://www.alibabacloud.com/help/en/redis/use-cases/use-pipelining-to-batch-issue-commands#:~:text=You%20can%20use%20the%20Redis,network%20latency%20and%20improving%20performance.)
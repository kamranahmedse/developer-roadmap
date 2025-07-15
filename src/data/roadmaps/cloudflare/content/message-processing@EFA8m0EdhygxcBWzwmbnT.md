# Message Processing

With Cloudflare Queues, message processing involves sending messages to a queue from a producer (usually a Worker) and then consuming those messages from the queue by a consumer (another Worker or service). The consumer processes each message, performing tasks like data transformation, calling APIs, or updating databases. Queues guarantees at-least-once delivery, meaning a message will be delivered to a consumer at least once, even if there are failures. Consumers can acknowledge successful processing to remove messages from the queue.

Visit the following resources to learn more:

- [@official@Cloudflare Queues · Cloudflare Queues](https://developers.cloudflare.com/queues/)
- [@official@How Does Queues Work?](https://developers.cloudflare.com/queues/reference/how-queues-works/)
- [@article@Difference Between Stream Processing and Message Processing](https://stackoverflow.com/questions/41744506/difference-between-stream-processing-and-message-processing)

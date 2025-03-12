# Dead Letter Queues

Dead Letter Queues (DLQs) are an important part of a robust message queuing system. In Cloudflare Queues, a DLQ is a separate queue where messages that cannot be processed successfully after multiple retries are sent. This allows you to isolate problematic messages and prevent them from causing continuous failures. You can then investigate the messages in the DLQ to identify and fix the underlying issues.

Visit the following resources to learn more:

- [@article@What is DLQ? - Dead-Letter Queue Explained - AWS](https://aws.amazon.com/what-is/dead-letter-queue/)
- [@article@Dead Letter Queue](https://en.wikipedia.org/wiki/Dead_letter_queue)

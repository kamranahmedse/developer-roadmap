# Message Queues

Message queues are a fundamental element of server-side game development, primarily used for communication and data exchange between different processes, threads, or microservices. A message queue operates on the principle of first-in, first-out (FIFO). In the typical process, a sender submits messages to the queue, and receivers extract messages from the queue. This mechanism ensures seamless coordination between different parts of a system performing at different speeds and allows asynchronous information exchange. Features such as persistence, delivery acknowledgement, prioritization, and scheduling are commonly associated with message queues. Different technologies support message queues including RabbitMQ, Apache Kafka, and AWS SQS among others. The choice of the appropriate message queue technology can depend on specific requirements, such as the relevant programming language and the expected size and rate of message traffic.

Visit the following resources to learn more:

- [@article@What's the Difference Between Kafka and RabbitMQ? - AWS](https://aws.amazon.com/compare/the-difference-between-rabbitmq-and-kafka/)
- [@article@Message Queue System Design Guide - System Design Handbook](https://www.systemdesignhandbook.com/guides/message-queue-system-design/)
- [@article@What is a Message Queue? - IBM](https://www.ibm.com/think/topics/message-queue)

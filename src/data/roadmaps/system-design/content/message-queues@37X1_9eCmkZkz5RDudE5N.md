# Message Queues

Message queues receive, hold, and deliver messages. If an operation is too slow to perform inline, you can use a message queue with the following workflow:

- An application publishes a job to the queue, then notifies the user of job status
- A worker picks up the job from the queue, processes it, then signals the job is complete

The user is not blocked and the job is processed in the background. During this time, the client might optionally do a small amount of processing to make it seem like the task has completed. For example, if posting a tweet, the tweet could be instantly posted to your timeline, but it could take some time before your tweet is actually delivered to all of your followers.

- [@article@Redis](https://redis.io/) is useful as a simple message broker but messages can be lost.
- [@article@RabbitMQ](https://www.rabbitmq.com/) is popular but requires you to adapt to the 'AMQP' protocol and manage your own nodes.
- [@article@AWS SQS](https://aws.amazon.com/sqs/) is hosted but can have high latency and has the possibility of messages being delivered twice.
- [@article@Apache Kafka](https://kafka.apache.org/) is a distributed event store and stream-processing platform.

To learn more, visit the following links:

- [@article@What is Redis?](https://redis.io/)
- [@article@RabbitMQ in Message Queues](https://www.rabbitmq.com/)
- [@article@Overview of Amazon SQS](https://aws.amazon.com/sqs/)
- [@article@Apache Kafka](https://kafka.apache.org/)
- [@article@RabbitMQ for beginners](https://www.cloudamqp.com/blog/part1-rabbitmq-for-beginners-what-is-rabbitmq.html)
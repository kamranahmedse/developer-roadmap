# Pub/Sub Messaging

Pub/Sub messaging in Redis is a messaging pattern that allows clients to communicate with each other through channels without needing direct connections. In this model, clients can subscribe to one or more channels to receive messages and can publish messages to these channels. When a message is published, all subscribed clients receive it in real-time, making it ideal for applications requiring instant notifications, such as chat systems, live updates, or event broadcasting. Redis's implementation of Pub/Sub is simple and efficient, supporting commands like `PUBLISH`, `SUBSCRIBE`, and `UNSUBSCRIBE`, although it does not provide message persistence or acknowledgment, which means that messages are not stored for clients that are not actively subscribed at the time of publishing.

Learn more from the following resources:

- [@official@Redis Pub/Sub](https://redis.io/docs/latest/develop/interact/pubsub/)
- [@official@PUBLISH Command](https://redis.io/docs/latest/commands/publish/)
- [@official@SUBSCRIBE Command](https://redis.io/docs/latest/commands/subscribe/)
- [@official@UNSUBSCRIBE Command](https://redis.io/docs/latest/commands/unsubscribe/)
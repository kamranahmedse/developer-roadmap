# Pub/Sub

Pub/Sub in Redis is a powerful messaging paradigm that allows for real-time communication between clients through a publish/subscribe model. In this system, publishers send messages to specific channels without knowing who, if anyone, will receive them. Subscribers, on the other hand, express interest in particular channels and receive messages published to those channels instantly. This decouples the message producers from the consumers, facilitating flexible and scalable communication. Key commands in this model include `PUBLISH` for sending messages, `SUBSCRIBE` for listening to channels, and `UNSUBSCRIBE` for stopping the reception of messages. While Redis Pub/Sub is efficient for real-time applications like chat and notifications, it does not store messages for clients that are not subscribed at the time of publication, which means that message persistence is not inherently supported.

Learn more from the following resources:


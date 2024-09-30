# Message Broker

A message broker is a middleware system that enables communication between different services or applications by routing, storing, and delivering messages. Redis can serve as a lightweight message broker using its `PUBLISH` and `SUBSCRIBE` commands for a pub/sub messaging pattern, or through lists and sorted sets for more advanced messaging scenarios like task queues. Redis Streams provide additional features like message persistence, acknowledgment, and consumer groups, making it suitable for both real-time communication and more complex message processing pipelines. Its high throughput and low latency make Redis an efficient solution for building scalable messaging systems.

Learn more from the following resources:
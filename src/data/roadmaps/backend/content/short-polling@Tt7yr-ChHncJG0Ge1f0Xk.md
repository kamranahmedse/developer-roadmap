# Short Polling

Short polling is a technique where a client periodically sends requests to a server at regular intervals to check for updates or new data. The server responds with the current state or any changes since the last request. While simple to implement and compatible with most HTTP infrastructures, short polling can be inefficient due to the frequent network requests and potential for increased latency in delivering updates. It contrasts with long polling and WebSockets, which offer more efficient mechanisms for real-time communication. Short polling is often used when real-time requirements are less stringent and ease of implementation is a priority.

Learn more from the following resources:

- [@article@Amazon SQS Short and Long Polling](https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-short-and-long-polling.html)
- [@video@Short Polling vs Long Polling vs WebSockets](https://www.youtube.com/watch?v=ZBM28ZPlin8)

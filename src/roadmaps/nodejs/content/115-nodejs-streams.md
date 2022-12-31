# Nodejs streams

Streams are a type of data handling methods and are used to read, write or transform chunks of data piece by piece without keeping it in memory all at once. There are four types of streams in Node.js.

- **Readable**: streams from which data can be read.
- **Writable**: streams to which we can write data.
- **Duplex**: streams that are both Readable and Writable.
- **Transform**: streams that can modify or transform the data as it is written and read.

Multiple streams can be chained together using `pipe()` method.

{% resources %}
  {% Official "https://nodejs.org/api/stream.html", "Stream API Official Documentation" %}
  {% Blog "https://www.youtube.com/watch?v=GlybFFMXXmQ", "Node.js Streams tutorial" %}
  {% Blog "https://nodesource.com/blog/understanding-streams-in-nodejs", "Understanding Streams in Node.js" %}
{% endresources %}

# Nodejs streams

Streams are a type of data handling methods and are used to read, write or transform chunks of data piece by piece without keeping it in memory all at once. There are four types of streams in Node.js.

- **Readable**: streams from which data can be read.
- **Writable**: streams to which we can write data.
- **Duplex**: streams that are both Readable and Writable.
- **Transform**: streams that can modify or transform the data as it is written and read.

Multiple streams can be chained together using `pipe()` method.

<ResourceGroupTitle>Free Content</ResourceGroupTitle>

<BadgeLink colorScheme='blue' badgeText='Official Website' href='https://nodejs.org/api/stream.html'>Stream API Official Documentation</BadgeLink>
<BadgeLink badgeText='Watch' href='https://www.youtube.com/watch?v=GlybFFMXXmQ'>Node.js Streams tutorial</BadgeLink>
<BadgeLink colorScheme='yellow' badgeText='Read' href='https://nodesource.com/blog/understanding-streams-in-nodejs'>Understanding Streams in Node.js</BadgeLink>

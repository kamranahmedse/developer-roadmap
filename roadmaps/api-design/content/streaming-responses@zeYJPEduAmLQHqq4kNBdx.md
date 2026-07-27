# Streaming Responses

Streaming responses allow a server to send data to the client incrementally as it becomes available, rather than buffering the entire response and sending it at once. This is useful for large datasets, file downloads, log tailing, or AI-generated text where the first tokens can be delivered to the user before the full response is ready. HTTP chunked transfer encoding and SSE are common mechanisms for streaming, and it meaningfully improves perceived performance for slow or large responses.

Visit the following resources to learn more:

- [@article@Streaming Data with REST APIs](https://apisyouwonthate.com/blog/streaming-data-with-rest-apis/)
- [@video@https://www.youtube.com/watch?v=xTTtqwGWemw](https://www.youtube.com/watch?v=xTTtqwGWemw&t=210s)
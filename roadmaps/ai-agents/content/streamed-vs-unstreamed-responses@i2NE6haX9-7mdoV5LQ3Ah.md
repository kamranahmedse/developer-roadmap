# Streamed vs Unstreamed Responses

Streamed and unstreamed responses describe how an AI agent sends its answer to the user. With a streamed response, the agent starts sending words as soon as it generates them. The user sees the text grow on the screen in real time. This feels fast and lets the user stop or change the request early. It is useful for long answers and chat-like apps.

An unstreamed response waits until the whole answer is ready, then sends it all at once. This makes the code on the client side simpler and is easier to cache or log, but the user must wait longer, especially for big outputs. Choosing between the two depends on the need for speed, the length of the answer, and how complex you want the client and server to be.

Visit the following resources to learn more:

- [@article@Streaming Responses in AI: How AI Outputs Are Generated in Real Time](https://dev.to/pranshu_kabra_fe98a73547a/streaming-responses-in-ai-how-ai-outputs-are-generated-in-real-time-18kb)
- [@article@AI for Web Devs: Faster Responses with HTTP Streaming](https://austingil.com/ai-for-web-devs-streaming/)
- [@article@Master the OpenAI API: Stream Responses](https://www.toolify.ai/gpts/master-the-openai-api-stream-responses-139447)
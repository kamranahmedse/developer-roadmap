# Server Sent Events

Server-Sent Events (SSE) is a technology that allows a web server to push data to a client in real-time. It uses an HTTP connection to send a stream of data from the server to the client, and the client can listen for these events and take action when they are received. SSE is useful for applications that require real-time updates, such as chat systems, stock tickers, and social media feeds. It is a simple and efficient way to establish a long-lived connection between a client and a server, and it is supported by most modern web browsers.

To use SSE, the client must create an EventSource object and specify the URL of the server-side script that will send the events. The server can then send events by writing them to the response stream with the proper formatting.

Visit the following resources to learn more:

- [@article@Server-Sent Events - MDN](https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events)
- [@video@Server-Sent Events - Postman](https://www.youtube.com/watch?v=KrE044J8jEQ)

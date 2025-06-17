# Server Sent Events

Server-Sent Events (SSE) let a web server send live updates to a webpage. It uses a regular HTTP connection for a one-way stream of data from server to client. This is good for things like live chats or news feeds. It's a simple way to keep a connection open for updates and works in most browsers. The webpage listens for these events and acts on them.

To use SSE, the client must create an EventSource object and specify the URL of the server-side script that will send the events. The server can then send events by writing them to the response stream with the proper formatting.

Visit the following resources to learn more:

- [@article@Server-Sent Events - MDN](https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events)
- [@video@Server-Sent Events - Postman](https://www.youtube.com/watch?v=KrE044J8jEQ)

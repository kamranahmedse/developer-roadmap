# Web sockets

In addition to normal HTTP requests, you can connect to servers using WebSockets. WebSockets allow for two-way communication with a server without polling.

<ResourceGroupTitle>Free Content</ResourceGroupTitle>
<BadgeLink colorScheme='blue' badgeText='Official Docs' href='https://docs.flutter.dev/cookbook/networking/web-sockets'>Work with WebSockets</BadgeLink>

Web sockets allows for bidirectional communication between a client (such as a web browser) and a server over a single, long-lived connection. They are a more efficient alternative to HTTP for providing real-time data, as they allow for the server to push data to the client as soon as it becomes available, rather than requiring the client to continuously poll the server for updates.

To learn more about Web sockets, you may find the following resources useful:

[The Web Socket API:](https://developer.mozilla.org/en-US/docs/Web/API/WebSocket) This is the official W3C specification for the Web socket API, which defines the interface that web socket client and server implementations must follow.

[WebSockets - MDN:](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API) This is a comprehensive guide to web sockets from the Mozilla Developer Network (MDN). It covers everything from the basics of how web sockets work, to more advanced topics such as security and performance.


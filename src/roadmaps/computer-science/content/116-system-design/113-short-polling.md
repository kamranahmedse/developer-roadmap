# Short Polling

In short polling, the client requests information from the server. The server processes the request. If data is available for the request, server responds to the request with the required information. However, if the server has no data available for the client, server returns an empty response. In both the situation, the connection will be closed after returning the response. Clients keep issuing new requests even after server sends the empty responses. This mechanism increases the network cost on the server.

- [What are Long-Polling, Websockets, Server-Sent Events (SSE) and Comet?](https://stackoverflow.com/questions/11077857/what-are-long-polling-websockets-server-sent-events-sse-and-comet)

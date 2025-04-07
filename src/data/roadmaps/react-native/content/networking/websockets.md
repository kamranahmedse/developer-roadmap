# Websockets

WebSockets are a protocol that allows full-duplex communication between a client and a server over a single, long-lived connection. They are useful when real-time communication is needed, such as in chat applications, online gaming, or financial trading platforms.

## Setting up a WebSocket connection

In React Native, you can use the `WebSocket` API to establish a WebSocket connection with the server. Here's an example of how to open a WebSocket connection:

```javascript
const webSocket = new WebSocket('ws://my-websocket-server.com');
```

## Receiving and sending messages

You can handle the different events associated with a WebSocket connection by attaching event listeners to the `WebSocket` instance.

### Handling connection

To handle connection establishment, you can use the `onopen` event listener:

```javascript
webSocket.onopen = (event) => {
  console.log('WebSocket connection opened:', event);
};
```

### Handling incoming messages

To receive messages from the server, you can use the `onmessage` event listener:

```javascript
webSocket.onmessage = (event) => {
  console.log('Received from server:', event.data);
};
```

### Sending messages to the server

To send messages to the server, you can use the `send` method:

```javascript
webSocket.send('Hello server');
```

### Handling connection error and closure

You can catch connection errors and closure events using the `onerror` and `onclose` event listeners:

```javascript
webSocket.onerror = (event) => {
  console.log('WebSocket error:', event);
};

webSocket.onclose = (event) => {
  console.log('WebSocket connection closed:', event);
};
```

## Closing the WebSocket connection

To close the WebSocket connection, you can use the `close` method:

```javascript
webSocket.close();
```

That's a brief summary of using WebSockets in React Native! Don't forget to handle various edge cases such as connection loss, reconnection, and graceful shutdowns in a real-world application.
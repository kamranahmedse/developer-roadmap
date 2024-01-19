To create a minimal `Hello, World!` HTTP server in Node.js, you can use the `http` module. It provides an HTTP server, and the createServer() method sets up a server instance with a callback function to handle incoming requests

```js
import http from 'node:http';

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello World\n');
});

server.listen(3000, () => {
  console.log('Server running at http://localhost:3000/');
});
```

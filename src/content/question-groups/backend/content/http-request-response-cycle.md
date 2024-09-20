The HTTP protocol is very structured and consists of a very well-defined set of steps:

- **Open the connection.** The client opens a TCP connection to the server. The port will be port 80 for HTTP connections and 443 for HTTPS (secured) connections.
- **Send the request.** The client will now send the HTTP request to the server. The request contains the following information:
  - An [HTTP method](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods). It can be any of them (i.e. GET, POST, PUT, DELETE, etc).
  - A URI (or Uniform Resource Identifier). This specifies the location of the resources on the server.
  - The HTTP version (usually HTTP/1.1 or HTTP/2).
  - A set of headers. They include extra data related to the request; there is a [full list of HTTP headers](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers) that can be used here.
  - The optional body. Depending on the type of request, you’ll want to also send data, and the data is encoded inside the body of the request.
- **Request processed by the server.** At this stage, the server will process the request and prepare a response.
- **Send the HTTP response back to the client.** Through the open channel, the server sends back an HTTP response. The response will contain the following elements:
  - The HTTP Version.
  - The status code. There is a list of [potential status codes](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status) that describe the result of the request.
  - A set of headers with extra data.
  - The optional body, just like with the request, the body of the response is optional.
- **The connection is closed.** This is usually the last step, although with newer versions of the protocol, there are options to leave the channel open and continue sending requests and responses back and forth.
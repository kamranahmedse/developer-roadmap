For an API to be RESTful (which means it complies with the REST guidelines), it needs to:

- It needs to follow a client-server architecture (which all HTTP-based services do).
- It has to provide a uniform interface which means:
  - There should be a way to identify resources from each other through URIs (Unique Resource Identification).
  - There should be a way to modify resources through their representation.
  - Messages should be self descriptive, meaning that each message should provide enough information to understand how to process it.
  - Clients using the API should be able to discover actions available for the current resource using the provided response from the server (this is known as HATEOAS or Hypermedia as the Engine of Application State).
- It needs to be stateless, which means each request to the server must contain all information to process the request.
- It should be a layered system, meaning that client and server don’t have to be connected directly to each other, there might be intermediaries, but that should not affect the communication between client and server.
- Resources should be cacheable either by client or by server.
- Optionally, the server could send code to the client for it to execute (known as “Code on Demand”).
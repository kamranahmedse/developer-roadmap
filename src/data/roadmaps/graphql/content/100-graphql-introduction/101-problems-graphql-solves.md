# Problems GraphQL Solves

GraphQL solves several problems commonly faced when building APIs, including:

- **Over-fetching:** With REST APIs, the client often receives more data than it needs, resulting in wasted bandwidth and slow performance. GraphQL allows the client to specify exactly the data it needs, reducing over-fetching.

- **Under-fetching:** With REST, the client often has to make multiple requests to different endpoints to gather all the data it needs, resulting in additional latency and complexity. GraphQL allows the client to request all the necessary data in a single request.

- **Inefficient versioning:** With REST, creating a new endpoint for each version of an API can quickly become cumbersome and hard to maintain. GraphQL allows for seamless versioning by adding new fields and types, rather than creating new endpoints.

- **Lack of flexibility:** REST APIs are typically fixed, meaning that the client has to work with the data structure provided by the API. GraphQL allows the client to request exactly the data it needs and receive it in a predictable format, increasing flexibility.

- **Microservice communicating** with Federation or Supergraph implementation you can easily query data from multiple microservice in one single query without code overhead or request overhead (if nothing requested from one microservice it wouldn't make a real network request for this data)

# GraphQL HTTP

GraphQL HTTP is a specification for serving GraphQL over HTTP. It defines a standard way of sending GraphQL queries and mutations over the HTTP protocol, and it is widely supported by GraphQL servers and clients.

The GraphQL HTTP specification defines two main HTTP methods:

- **POST:** Used to send queries and mutations to the server. The query or mutation is sent in the request body as a JSON payload, and the server returns the result in the response body.
- **GET:** Used to send queries to the server, but it's not recommended to use GET for queries because it's not as efficient as POST method.

Learn more from the following links:

- [Overview of GraphQL HTTP](https://graphql.org/graphql-js/express-graphql/#graphqlhttp)
- [Get Started with GraphQL HTTP](https://graphql.org/learn/serving-over-http/)

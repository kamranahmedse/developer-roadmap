# Asynchronous

In GraphQL, a resolver is a function that is responsible for fetching the data for a field in a query or mutation. Resolvers are defined in the schema and are executed by the GraphQL server when a query or mutation is received.

An asynchronous resolver is a type of resolver that runs, but instead of returning the final value, it returns a promise that will be resolved with the final value. This allows the resolver to wait for an external event such as a database query or a third-party API call to complete before returning the result.

Learn more from the following links:

- [@official@Get Started with Asynchronous](https://graphql.org/learn/execution/#asynchronous-resolvers)

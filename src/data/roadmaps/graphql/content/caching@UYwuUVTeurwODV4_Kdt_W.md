# Caching

Caching in GraphQL improves performance by storing query results for reuse. Strategies include HTTP caching, response caching, dataloader for batching requests, and normalized caching at the client level to reduce redundant API calls and improve user experience.

Caching is a technique that is used to improve the performance of a GraphQL server by reducing the number of requests that need to be made to the data source. It works by storing a copy of the data that has been requested by a client in a cache, and then returning that data from the cache instead of the data source when the same data is requested again.

There are several types of caching that can be used in GraphQL:

- Client-side caching
- Server-side caching
- CDN caching

Learn more from the following links:

- [@official@Get started with Caching](https://graphql.org/learn/caching/)

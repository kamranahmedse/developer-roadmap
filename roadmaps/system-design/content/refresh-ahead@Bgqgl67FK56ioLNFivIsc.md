# Refresh Ahead
 
Refresh-ahead is a caching strategy where the system automatically refreshes a cached item before it expires, based on predicted access patterns. This can reduce latency for frequently accessed data by avoiding cache misses altogether. It works best when access patterns are predictable, since refreshing rarely used data wastes resources.

Visit the following resources to learn more:

- [@article@From cache to in-memory data grid](http://www.slideshare.net/tmatyashovsky/from-cache-to-in-memory-data-grid-introduction-to-hazelcast)
- [@article@Caching Strategy: Refresh Ahead Pattern](https://www.enjoyalgorithms.com/blog/refresh-ahead-caching-pattern)
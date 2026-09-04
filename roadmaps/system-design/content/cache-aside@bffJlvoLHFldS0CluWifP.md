# Cache-Aside
 
Cache-aside, also called lazy loading, is a caching strategy where the application checks the cache first, and on a miss, fetches the data from the database and writes it into the cache for next time. This keeps the cache populated only with data that has actually been requested. The downside is that a cache miss adds extra latency for that particular request.

Visit the following resources to learn more:

- [@article@From cache to in-memory data grid](https://www.slideshare.net/tmatyashovsky/from-cache-to-in-memory-data-grid-introduction-to-hazelcast)
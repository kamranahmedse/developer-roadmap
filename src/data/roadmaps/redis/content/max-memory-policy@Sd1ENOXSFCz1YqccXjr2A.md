# Max Memory Policy

The Max Memory Policy in Redis determines how the server handles data when it reaches the configured maximum memory limit. Redis offers several eviction policies, such as `noeviction` (return an error on writes), `allkeys-lru` (evict the least recently used keys), `volatile-lru` (evict the least recently used keys with an expiration set), `allkeys-random` (evict random keys), and others. These policies allow Redis to optimize memory usage based on the use case, balancing between maintaining data availability and minimizing the risk of data loss when memory constraints are reached.

Learn more from the following resources:

- [@official@Database Memory Limits](https://redis.io/docs/latest/operate/rs/databases/memory-performance/memory-limit/)
- [@official@Eviction Policy](https://redis.io/docs/latest/operate/rs/databases/memory-performance/eviction-policy/)
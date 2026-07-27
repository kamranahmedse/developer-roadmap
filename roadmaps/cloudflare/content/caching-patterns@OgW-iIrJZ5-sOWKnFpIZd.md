# Caching Patterns

Caching is a critical aspect of building performant and scalable applications. Cloudflare Workers provide several caching patterns that you can use to optimize your application's performance. These patterns include:

- **Cache-First:** Serve from cache if available, otherwise fetch from origin.
- **Network-First:** Always fetch from origin, caching the response for subsequent requests.
- **Stale-While-Revalidate:** Serve from cache immediately, then update the cache in the background.

You can also manipulate HTTP cache headers (Cache-Control, Expires) to control how Cloudflare's CDN caches content. Effective caching is crucial for improving performance and reducing origin server load.

Visit the following resources to learn more:

- [@official@How the Cache Works · Cloudflare Workers](https://developers.cloudflare.com/workers/reference/how-the-cache-works/)
- [@article@Caching Strategies](https://docs.aws.amazon.com/whitepapers/latest/database-caching-strategies-using-redis/caching-patterns.html)
- [@article@Caching Static and Dynamic Content](https://www.cloudflare.com/learning/cdn/caching-static-and-dynamic-content/)

# Caching Strategies

Cloudflare Workers allow fine-grained control over caching. You can use the Cache API to store and retrieve responses directly within your Worker, bypassing the origin server. Strategies include:

- **Cache-First:** Serve from cache if available, otherwise fetch from origin.
- **Network-First:** Always fetch from origin, caching the response for subsequent requests.
- **Stale-While-Revalidate:** Serve from cache immediately, then update the cache in the background.

You can also manipulate HTTP cache headers (Cache-Control, Expires) to control how Cloudflare's CDN caches content. Effective caching is critical for improving performance and reducing origin server load.

Visit the following resources to learn more:

- [@official@Cache · Cloudflare Workers](https://developers.cloudflare.com/workers/runtime-apis/cache/)
- [@official@How the Cache Works · Cloudflare Workers ](https://developers.cloudflare.com/workers/reference/how-the-cache-works/)

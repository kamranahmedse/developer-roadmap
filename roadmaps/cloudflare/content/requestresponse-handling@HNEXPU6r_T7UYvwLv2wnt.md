# Request/Response Handling

Cloudflare Workers excel at intercepting and modifying HTTP requests and responses. When a request hits Cloudflare, a Worker can inspect the request details (headers, URL, method) and take actions: rewrite the URL, modify headers, or even serve a completely different response. Similarly, Workers can intercept responses from the origin server, modifying the content, adding headers for caching, or even serving a cached version directly. This level of control allows for powerful customization and optimization of web traffic.

Visit the following resources to learn more:

- [@official@Request and Response](https://developers.cloudflare.com/workers/runtime-apis/request)
- [@article@Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)

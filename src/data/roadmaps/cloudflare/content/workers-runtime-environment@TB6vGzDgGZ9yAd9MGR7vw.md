# Workers Runtime Environment

The Workers runtime environment is a lightweight JavaScript execution environment running on Cloudflare's edge network. It's based on V8, the same engine that powers Chrome and Node.js, but optimized for speed and security. Workers have limited access to global variables and APIs compared to a traditional Node.js environment, focusing on handling HTTP requests and responses. It provides APIs for caching, KV storage, and accessing request information, enabling performant and globally distributed serverless functions.

Visit the following resources to learn more:

- [@official@How Workers Works · Cloudflare](https://developers.cloudflare.com/workers/reference/how-workers-works/)
- [@official@Introducing workerd: the Open Source Workers Runtime](https://blog.cloudflare.com/workerd-open-source-workers-runtime/)
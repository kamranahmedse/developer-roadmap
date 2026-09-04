# Pull CDNs
 
A pull CDN fetches content from the origin server the first time a user requests it, then caches that content for subsequent requests until it expires. This keeps the CDN in sync with the origin automatically, since new or updated content gets pulled in on demand. It works well for sites with content that changes often but is not accessed instantly after publishing.

Visit the following resources to learn more:

- [@opensource@Introduction to CDNs](https://github.com/donnemartin/system-design-primer#content-delivery-network)
- [@article@The Differences Between Push And Pull CDNs](http://www.travelblogadvice.com/technical/the-differences-between-push-and-pull-cdns/)
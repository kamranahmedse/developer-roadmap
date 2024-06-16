# Pull CDNs

Pull CDNs grab new content from your server when the first user requests the content. You leave the content on your server and rewrite URLs to point to the CDN. This results in a slower request until the content is cached on the CDN.

A time-to-live (TTL) determines how long content is cached. Pull CDNs minimize storage space on the CDN, but can create redundant traffic if files expire and are pulled before they have actually changed. Sites with heavy traffic work well with pull CDNs, as traffic is spread out more evenly with only recently-requested content remaining on the CDN.

To learn more, visit the following links:

- [@opensource@Introduction to CDNs](https://github.com/donnemartin/system-design-primer#content-delivery-network)
- [@article@The Differences Between Push And Pull CDNs](http://www.travelblogadvice.com/technical/the-differences-between-push-and-pull-cdns/)

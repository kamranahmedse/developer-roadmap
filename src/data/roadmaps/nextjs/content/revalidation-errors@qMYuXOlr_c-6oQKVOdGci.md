# Revalidation Errors

When revalidation fails, it means the attempt to refresh the cached data encountered an issue, preventing the application from displaying the most up-to-date information. These errors can stem from various sources, such as network connectivity problems, issues with the data source itself (e.g., a database being unavailable), or problems within the revalidation logic. In Next.js, If an error is thrown while attempting to revalidate data, the last successfully generated data will continue to be served from the cache. On the next subsequent request, Next.js will retry revalidating the data.

Visit the following resources to learn more:

- [@official@Error handling and revalidation](https://nextjs.org/docs/14/app/building-your-application/data-fetching/fetching-caching-and-revalidating)
# Memoization in Fetch

Memoization is an optimization technique that speeds up subsequent function calls by caching the results of previous calls with the same input parameters. This approach allows for re-use of data in a React Component tree, prevents redundant network calls and enhances performance
For the initial request, data is fetched from an external source and the result is stored in memory
Subsequent requests for the same data within the same render pass retrieve the result from memory, bypassing the need to make the request again.

Visit the following resources to learn more:

- [@official@Request Memoization](https://nextjs.org/docs/app/guides/caching#request-memoization)
- [@video@Next.js 14 Tutorial - vRequest Memoization](https://www.youtube.com/watch?v=tcLe3Xi0fJE)
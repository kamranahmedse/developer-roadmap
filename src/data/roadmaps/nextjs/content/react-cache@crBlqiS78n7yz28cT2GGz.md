# React Cache function

The React `cache` function allows you to memoize the return value of a function, allowing you to call the same function multiple times while only executing it once.

`fetch` requests using the `GET` or `HEAD` methods are automatically memoized, so you do not need to wrap it in React `cache`. However, for other `fetch` methods, or when using data fetching libraries (such as some database, CMS, or GraphQL clients) that don't inherently memoize requests, you can use `cache` to manually memoize data requests.

Visit the following resources to learn more:

- [@official@React cache function](https://nextjs.org/docs/app/guides/caching#react-cache-function)
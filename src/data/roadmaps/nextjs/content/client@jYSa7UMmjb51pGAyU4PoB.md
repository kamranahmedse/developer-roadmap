# Client-Side Data Fetching

Client-side data fetching involves retrieving data directly in the user's browser using JavaScript. This happens after the initial HTML content is loaded. When a user interacts with a page, or after a certain event, the browser makes a request to an API or data source. The fetched data is then used to update the user interface dynamically, without requiring a full page reload. 

Client-side data fetching is useful when your page doesn't require SEO indexing, when you don't need to pre-render your data, or when the content of your pages needs to update frequently.  It's important to note that using client-side data fetching can affect the performance of your application and the load speed of your pages. This is because the data fetching is done at the time of the component or pages mount, and the data is not cached.

Visit the following resources to learn more:

- [@official@Client-side Fetching for App Router](https://nextjs.org/docs/app/getting-started/fetching-data#client-components)
- [@official@Client-side Fetching for Pages Router](https://nextjs.org/docs/pages/building-your-application/data-fetching/client-side)
- [@video@Next.js 15 Tutorial - Fetching Data in Client Components](https://www.youtube.com/watch?v=7Kz4--kCBP0)
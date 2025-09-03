# Parallel vs Sequential

When fetching data inside React components, you need to be aware of two data fetching patterns: Parallel and Sequential. 

With sequential data fetching, requests in a route are dependent on each other and therefore create waterfalls. There may be cases where you want this pattern because one fetch depends on the result of the other, or you want a condition to be satisfied before the next fetch to save resources. However, this behavior can also be unintentional and lead to longer loading times. 

With parallel data fetching, requests in a route are eagerly initiated and will load data at the same time. This reduces client-server waterfalls and the total time it takes to load data.

Visit the following resources to learn more:

- [@official@Parallel and sequential data fetching](https://nextjs.org/docs/14/app/building-your-application/data-fetching/patterns#parallel-and-sequential-data-fetching)
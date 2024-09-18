# N plus one problem

The N+1 problem occurs in database querying when an application performs a query to retrieve a list of items and then issues additional queries to fetch related data for each item individually. This often results in inefficiencies and performance issues because the number of queries issued grows proportionally with the number of items retrieved. For example, if an application retrieves 10 items and then performs an additional query for each item to fetch related details, it ends up executing 11 queries (1 for the list and 10 for the details), leading to a total of 11 queries instead of 2. This can severely impact performance, especially with larger datasets. Solutions to the N+1 problem typically involve optimizing queries to use joins or batching techniques to retrieve related data in fewer, more efficient queries.

Visit the following resources to learn more:

- [@article@In Detail Explanation of N+1 Problem](https://medium.com/doctolib/understanding-and-fixing-n-1-query-30623109fe89)
- [@article@What is the N+1 Problem](https://planetscale.com/blog/what-is-n-1-query-problem-and-how-to-solve-it)
- [@article@Solving N+1 Problem: For Java Backend Developers](https://dev.to/jackynote/solving-the-notorious-n1-problem-optimizing-database-queries-for-java-backend-developers-2o0p)
- [@video@SQLite and the N+1 (no) problem](https://www.youtube.com/watch?v=qPfAQY_RahA)

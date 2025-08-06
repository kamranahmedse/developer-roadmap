# Data Optimization: Avoid Select * Queries and Fetch Only Required Columns

Efficiency in the backend of web applications can be significantly improved by careful data queries. By avoiding the use of "Select *" queries, and instead only fetching the necessary columns, you reduce the load and strain on the database. This can not only accelerate the response time, but also reduces the storage usage, thereby improving the overall performance. To illustrate, consider a large database with hundreds of columns; using "Select *" would fetch all that data unnecessarily when you might only need data from three or four columns. This smart selection contributes immensely to a more optimal backend performance.

Learn more from the following resources:

- [@article@Baeldung - When to Avoid Using SELECT * in SQL Queries?](https://www.baeldung.com/sql/select-all-columns-best-practice)
- [@article@GeeksforGeeks - SQL Query Optimizations](https://www.geeksforgeeks.org/sql/best-practices-for-sql-query-optimizations/)
- [@video@Youtube - How to Optimize Your SQL Queries with Real World Examples](https://www.youtube.com/watch?v=7atNyDISwlI&pp=0gcJCfwAo7VqN5tD)
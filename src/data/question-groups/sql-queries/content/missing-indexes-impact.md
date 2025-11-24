Missing indexes can affect the performance of queries, especially when the data grows. The major impacts of missing indexes are listed below:

- **Slow queries**: Without indexes, every read query will go through the whole table to find matching rows. This will get worse as the data in the table grows.
- **Locking and concurrency issues**: Scanning a table without indexes takes longer, and locking the table can prevent other queries from running, affecting application performance.
- **Inefficient joins**: Joins on tables without indexes on the join keys are extremely slow and result in bad query performance.
- **Poor user experience**: Missing indexes can lead to poor user experience in your applications. It can result to slower page loads, application hanging when data is being fetched from the database. 
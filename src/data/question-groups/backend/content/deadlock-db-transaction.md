There are many ways to prevent deadlocks in DB transactions; some of the most common are:

- Using lock ordering to acquire locks in a consistent global order, avoiding circular wait conditions.
- Using timeouts for DB transactions to automatically kill long-running operations that could lead to deadlocks.
- Use of optimistic concurrency control where possible, to avoid holding locks for too long.
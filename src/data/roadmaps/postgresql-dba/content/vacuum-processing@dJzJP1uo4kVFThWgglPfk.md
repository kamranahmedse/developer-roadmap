# Vacuum Processing

Vacuum processing is an essential aspect of maintaining the performance and stability of a PostgreSQL database. PostgreSQL uses a storage technique called Multi-Version Concurrency Control (MVCC), which allows multiple transactions to access different versions of a database object simultaneously. This results in the creation of multiple "dead" rows whenever a row is updated or deleted. Vacuum processing helps in cleaning up these dead rows and reclaiming storage space, preventing the database from becoming bloated and inefficient.

Learn more from the following resources:

- [@article@PostgreSQL VACUUM Guide and Best Practices](https://www.enterprisedb.com/blog/postgresql-vacuum-and-analyze-best-practice-tips)
- [@article@How to run VACUUM ANALYZE explicitly?](https://medium.com/@dmitry.romanoff/postgresql-how-to-run-vacuum-analyze-explicitly-5879ec39da47)

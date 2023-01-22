# RDBMS

A relational database like SQL is a collection of data items organized in tables. ACID is a set of properties of relational database transactions.

 - **Atomicity** - Each transaction is all or nothing
 - **Consistency** - Any transaction will bring the database from one valid state to another
 - **Isolation** - Executing transactions concurrently has the same results as if the transactions were executed serially
 - **Durability** - Once a transaction has been committed, it will remain so

There are many techniques to scale a relational database: master-slave replication, master-master replication, federation, sharding, denormalization, and SQL tuning.

To learn more, visit the following links:

- [Is there a good reason I see VARCHAR(255) used so often?](https://stackoverflow.com/questions/1217466/is-there-a-good-reason-i-see-varchar255-used-so-often-as-opposed-to-another-l)
- [How we optimized PostgreSQL queries 100x](https://towardsdatascience.com/how-we-optimized-postgresql-queries-100x-ff52555eabe?gi=13caf5bcf32e)
- [How do NULL values affect performance in a database search?](https://stackoverflow.com/questions/1017239/how-do-null-values-affect-performance-in-a-database-search)
- [Slow Query Log](https://dev.mysql.com/doc/refman/5.7/en/slow-query-log.html)
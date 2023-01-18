# RDBMS

A relational database like SQL is a collection of data items organized in tables. ACID is a set of properties of relational database transactions.

 - **Atomicity** - Each transaction is all or nothing
 - **Consistency** - Any transaction will bring the database from one valid state to another
 - **Isolation** - Executing transactions concurrently has the same results as if the transactions were executed serially
 - **Durability** - Once a transaction has been committed, it will remain so

There are many techniques to scale a relational database: master-slave replication, master-master replication, federation, sharding, denormalization, and SQL tuning.

To learn more, visit the following links:

- [Guide to RDBMS?](https://github.com/donnemartin/system-design-primer#relational-database-management-system-rdbms)
# Query Optimization

Query optimization is a function of SQL that involves tuning and optimizing a SQL statement so that the system executes it in the fastest and most efficient way possible. It includes optimizing the costs of computation, communication, and disk I/O.

The primary approaches of query optimization involve the following:

## Rewriting Queries

This means changing the original SQL query to an equivalent one which requires fewer system resources. It's usually done automatically by the database system.

For instance, let's say we have a query as follows:

```sql
SELECT * 
FROM Customers 
WHERE state = 'New York' AND city = 'New York';
```

The above query can be rewritten using a subquery for better optimization:

```sql
SELECT * 
FROM Customers 
WHERE state = 'New York' 
AND city IN (SELECT city 
              FROM Customers 
              WHERE city = 'New York');
```

## Choosing the right index

Indexes are used to find rows with specific column values quickly. Without an index, SQL has to begin with the first row and then read through the entire table to find the appropriate rows. The larger the table, the more costly the operation. Choosing a right and efficient index greatly influence on query performance.

For example,

```sql
CREATE INDEX index_name
ON table_name (column1, column2, ...);
```

## Fine-tuning Database Design

Improper database schema designs could result in poor query performances. While not strictly a part of query optimization, tuning the database design can speed up the query execution time drastically. 

Changes such as the separation of specific data to different tables (Normalization), combining redundant data (Denormalization), or changing the way how tables are linked (Optimized Join Operations), can be implemented to optimize the schema.

## Use of SQL Clauses wisely

The usage of certain SQL clauses can help in query optimization like LIMIT, BETWEEN etc.

Example,

```sql
SELECT column1, column2
FROM table_name
WHERE condition
LIMIT 10;
```

## System Configuration

Many database systems allow you to configure system parameters that control its behavior during query execution. For instance, in MySQL, you can set parameters like `sort_buffer_size` or `join_buffer_size` to tweak how MySQL would use memory during sorting and joining operations.

In PostgreSQL, you can set `work_mem` to control how much memory is utilized during operations such as sorting and hashing.

Always remember the goal of query optimization is to lessen the system resources usage in terms of memory, CPU time, and thus improve the query performance.
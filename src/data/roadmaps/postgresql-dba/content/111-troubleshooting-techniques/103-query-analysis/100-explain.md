# EXPLAIN

## PostgreSQL EXPLAIN command

The `EXPLAIN` command in PostgreSQL is an important tool used by database administrators (DBAs) to analyze the execution plan of a query. The execution plan details the join methods, tables, indexes, and scan types involved in a query operation, along with their respective costs. Analyzing these details enables DBAs to optimize their queries, improve performance, and debug potential performance issues.

### Using EXPLAIN

To use the `EXPLAIN` command, simply prefix your query with the `EXPLAIN` keyword:

```sql
EXPLAIN SELECT * FROM users WHERE age > 30;
```

This will output an execution plan without actually running the query. To run the query and see the plan at the same time, use the `EXPLAIN ANALYZE` command:

```sql
EXPLAIN ANALYZE SELECT * FROM users WHERE age > 30;
```

### Understanding the output

Here's a sample output of an `EXPLAIN` command:

```plaintext
Seq Scan on users  (cost=0.00..37.26 rows=10 width=39)
  Filter: (age > 30)
```

This output shows that a sequential scan (`Seq Scan`) is being used to scan the `users` table for rows with age greater than 30. The scan has a `cost` of 37.26, and the estimated number of rows returned (`rows`) is 10.

### Cost

The `cost` in the output is an estimation of the query's execution cost. It reflects the time it takes to fetch the required data from the database. The cost is divided into two values - **startup cost** and **total cost**.

* **Startup cost** refers to the cost incurred before producing the first row of output.
* **Total cost** refers to the cost incurred to produce all rows of output.

### Analyzing the plan

The output of the `EXPLAIN` command provides information about the operations involved in the query execution. By analyzing the output, you can identify opportunities to optimize the query. For example, you may create or adjust indexes, review join conditions, or modify WHERE clauses to improve performance.

### Additional options

You can use the following additional options with the `EXPLAIN` command to get more detailed and formatted output.

* **VERBOSE**: Provides more details about the query execution plan, including the output columns and data types.
* **FORMAT**: Allows you to choose a different output format (TEXT, XML, JSON, or YAML).

Example usage:

```sql
EXPLAIN (VERBOSE true, FORMAT json) SELECT * FROM users WHERE age > 30;
```

In conclusion, the `EXPLAIN` command in PostgreSQL is a powerful tool to review and optimize query performance, helping DBAs make informed decisions about query plans and potential optimizations.
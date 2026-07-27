# Query Analysis Techniques

Understanding how SQL queries are executed is essential for performance tuning. Tools like `EXPLAIN` or `EXPLAIN PLAN` allow you to dissect the execution plan the database uses for a specific query. This plan reveals the order in which tables are accessed, the types of indexes used (or not used), and the estimated cost of each operation, enabling you to identify bottlenecks and optimize the query for faster execution.

Visit the following resources to learn more:

- [@article@EXPLAIN](https://docs.snowflake.com/en/sql-reference/sql/explain)
- [@article@EXPLAIN PLAN](https://docs.oracle.com/en/database/oracle/oracle-database/19/sqlrf/EXPLAIN-PLAN.html)
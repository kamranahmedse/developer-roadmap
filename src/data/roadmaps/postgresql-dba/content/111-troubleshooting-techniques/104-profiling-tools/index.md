# Profiling Tools in PostgreSQL

Profiling tools in PostgreSQL are essential for diagnosing and resolving performance issues, as well as optimizing and tuning your database system. This section of the guide will cover an overview of commonly used profiling tools in PostgreSQL and how they can be of assistance.

## EXPLAIN and EXPLAIN ANALYZE

`EXPLAIN` and `EXPLAIN ANALYZE` are built-in SQL commands that provide detailed information about the execution plan of a query. They can help in identifying slow or inefficient queries, as well as suggesting possible optimizations.

- `EXPLAIN` shows the query plan without actually executing the query
- `EXPLAIN ANALYZE` not only shows the query plan but also executes it, providing actual runtime statistics

Example usage:

```sql
EXPLAIN SELECT * FROM users WHERE username = 'john';
EXPLAIN ANALYZE SELECT * FROM users WHERE username = 'john';
```

## pg_stat_statement

`pg_stat_statement` is a PostgreSQL extension that provides detailed statistics on query execution. It can help you identify slow queries, as well as analyze and optimize them. To use this extension, you must first enable it in your `postgresql.conf` and restart the server.

Example configuration:

```ini
shared_preload_libraries = 'pg_stat_statements'
pg_stat_statements.track = all
```

Once the extension is enabled, you can query the `pg_stat_statements` view to get various statistics on query execution, including total execution time, mean execution time, and the number of times a query has been executed.

Example query:

```sql
SELECT query, total_time, calls, mean_time
FROM pg_stat_statements
ORDER BY total_time DESC
LIMIT 10;
```

## auto_explain

`auto_explain` is another PostgreSQL extension that logs detailed execution plans for slow queries automatically, without requiring manual intervention. To enable this extension, update your `postgresql.conf` and restart the server.

Example configuration:

```ini
shared_preload_libraries = 'auto_explain'
auto_explain.log_min_duration = 5000 -- logs query plans taking longer than 5s
```

After enabling `auto_explain`, slow queries will be automatically logged in your PostgreSQL log file along with their execution plans.

## pg_stat_activity

`pg_stat_activity` is a built-in view in PostgreSQL that provides information on currently active queries, including their SQL text, state, and duration of execution. You can use this view to quickly identify long-running or problematic queries in your database.

Example query:

```sql
SELECT pid, query, state, now() - query_start AS duration
FROM pg_stat_activity
WHERE state <> 'idle'
ORDER BY duration DESC;
```

In summary, profiling tools in PostgreSQL can be indispensable when it comes to identifying, analyzing, and optimizing slow or inefficient queries. By using these tools effectively, you can significantly improve the performance of your database system.
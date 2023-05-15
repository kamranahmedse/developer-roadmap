# Pg Stat Statements

**Pg Stat Statements** is a system view in PostgreSQL that provides detailed statistics on the execution of SQL queries. It is particularly useful for developers and database administrators to identify performance bottlenecks, optimize query performance, and troubleshoot issues. This view can be queried directly or accessed through various administration tools.

To use Pg Stat Statements, you need to enable the `pg_stat_statements` extension by adding the following line to the `postgresql.conf` configuration file:

```ini
shared_preload_libraries = 'pg_stat_statements'
```

You might also want to adjust the following settings to control the amount of data collected:

- `pg_stat_statements.max`: The maximum number of statements tracked (default is 5000).
- `pg_stat_statements.track`: Controls which statements are tracked; can be set to `all`, `top`, or `none` (default is `top`).

After enabling the extension, restart the PostgreSQL server and run the following command:

```sql
CREATE EXTENSION pg_stat_statements;
```

Now you can query the `pg_stat_statements` view to get useful information about query execution. Let's take a look at some example queries.

## Finding the Total Time Spent on Queries

To see the total time spent on all queries executed by the system, use the following query:

```sql
SELECT sum(total_time) AS total_time_spent
FROM pg_stat_statements;
```

## Top 10 Slowest Queries

To identify the top 10 slowest queries, you can sort the results on `mean_time` descending and limit the results to 10:

```sql
SELECT query, total_time, calls, mean_time, stddev_time, rows
FROM pg_stat_statements
ORDER BY mean_time DESC
LIMIT 10;
```

## Resetting the Statistics

If needed, you can reset the statistics collected by `pg_stat_statements` using the following command:

```sql
SELECT pg_stat_statements_reset();
```

In summary, the `pg_stat_statements` system view in PostgreSQL is a valuable tool for analyzing query performance and identifying opportunities for optimization. Be sure to familiarize yourself with this view and leverage its capabilities in your day-to-day PostgreSQL tasks.
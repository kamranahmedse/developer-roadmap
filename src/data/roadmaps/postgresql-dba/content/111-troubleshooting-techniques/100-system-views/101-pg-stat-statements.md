# pg_stat_statements

## Pg Stat Statements

`pg_stat_statements` is a PostgreSQL extension that provides a means to track execution statistics of all SQL statements executed by a server. This is an extremely useful tool for DBAs and developers alike, as it can give insights about query performance, aiding in identifying slow or problematic queries, and helping to optimize them.

### Enabling pg_stat_statements

By default, `pg_stat_statements` is not enabled in a PostgreSQL installation. In order to enable it, you will need to add it to the `shared_preload_libraries` configuration parameter in the `postgresql.conf` file.

```
shared_preload_libraries = 'pg_stat_statements'
```

After updating the configuration, you'll need to restart your PostgreSQL server for the change to take effect. Once it's up and running, you'll need to create the extension in the database you wish to monitor:

```sql
CREATE EXTENSION pg_stat_statements;
```

### Querying pg_stat_statements

Now that the extension is enabled, you can query the `pg_stat_statements` view to gain insights into your server's statement execution. Here is an example query that lists the top 10 slowest queries in the system:

```sql
SELECT query, total_time, calls, mean_time
FROM pg_stat_statements
ORDER BY mean_time DESC
LIMIT 10;
```

This will return the SQL text, total execution time, number of calls, and average execution time for each query. 

Some other useful columns in the view include:

- `rows`: Total number of rows retrieved or affected by the statement.
- `shared_blks_read`: Total number of shared blocks read by the statement.
- `shared_blks_written`: Total number of shared blocks written by the statement.

Make sure to check the [official PostgreSQL documentation](https://www.postgresql.org/docs/current/pgstatstatements.html) for a full list of columns and their descriptions.

### Resetting Statistics

Over time, you may want to reset the collected statistics to start fresh or focus on a specific time window. You can do so by calling the `pg_stat_statements_reset()` function:

```sql
SELECT pg_stat_statements_reset();
```

Bear in mind that this action will reset the statistics for all databases within the PostgreSQL instance.

In summary, the `pg_stat_statements` extension allows you to monitor and analyze the performance of your SQL queries, thus making it easier to identify and optimize problematic statements. By understanding how your queries behave in your system, you'll be able to better fine-tune your PostgreSQL database performance.
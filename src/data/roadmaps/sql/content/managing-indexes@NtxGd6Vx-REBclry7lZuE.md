# Managing Indexes

Indexes can drastically speed up data retrieval in SQL databases by allowing the database to immediately locate the data needed without having to scan the entire database. However, these additional data structures also consume storage, and maintaining them can slow down any create, update, or delete operations, hence the need to manage them appropriately.

## Creating Indexes

To create an index, you use the `CREATE INDEX` command followed by the index name, the table name, and the columns you want to use in the index.

```sql
CREATE INDEX index_name
ON table_name(column_name);
```

## Removing Indexes 

If an index is no longer required or if it's causing performance issues due to too much storage consumption, it can be dropped using the `DROP INDEX` command.

```sql
DROP INDEX index_name;
```

## Listing Indexes

You can get a list of all the indexes on a table using the `SHOW INDEXES` command.

```sql
SHOW INDEXES IN table_name;
```

Remember that most SQL databases automatically create indexes for primary keys, and they do not need to be managed manually.

## Modifying Indexes

Modifying an existing index often means dropping the old index and creating a new one. PostgreSQL, MySQL, and MS SQL Server provide a way to reindex without dropping and recreating them manually.

For example, in PostgreSQL:

```sql
REINDEX INDEX index_name;
```

## Indexes and Performance

While indexes can improve read speed, they also slow down write operations because each write must also update the index. That's why it's essential to find a balance between the number of indexes and database performance. Too many indexes can negatively impact performance.

Therefore, you should only create indexes when they are likely to be needed and when they will have a significant impact on improving query performance. You can use the SQL Server Profiler, MySQL's slow query log, or other database-specific tools to identify the queries that are running slow, and then create indexes to optimize those queries. Regularly monitor your database performance to make sure that the indexes are still needed and that they are providing the expected improvements. 

Add indexes strategically and purposefully, and do regular cleanups of any unnecessary indexes.
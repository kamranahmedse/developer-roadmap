# Import and Export using COPY

In PostgreSQL, one of the fastest and most efficient ways to import and export data is by using the `COPY` command. The `COPY` command allows you to import data from a file, or to export data to a file from a table or a query result.

If you can't use the `COPY` command due to lack of privileges, consider using the `\copy` command in the `psql` client instead, which works similarly, but runs as the current user rather than the PostgreSQL server.

Learn more from the following resources:

- [@official@COPY](https://www.postgresql.org/docs/current/sql-copy.html)
- [@article@Copying data between tables in PostgreSQL](https://www.atlassian.com/data/sql/copying-data-between-tables)
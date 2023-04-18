# Import and Export using COPY

In PostgreSQL, one of the fastest and most efficient ways to import and export data is by using the `COPY` command. The `COPY` command allows you to import data from a file, or to export data to a file from a table or a query result.

## Importing Data using COPY

To import data from a file into a table, you can use the following syntax:

```sql
COPY <table_name> (column1, column2, ...)
FROM '<file_path>' [OPTIONS];
```

For example, to import data from a CSV file named `data.csv` into a table called `employees` with columns `id`, `name`, and `salary`, you would use the following command:

```sql
COPY employees (id, name, salary)
FROM '/path/to/data.csv'
WITH (FORMAT csv, HEADER true);
```

Here, we're specifying that the file is in CSV format and that the first row contains column headers.

## Exporting Data using COPY

To export data from a table or a query result to a file, you can use the following syntax:

```sql
COPY (SELECT ... FROM <table_name> WHERE ...)
TO '<file_path>' [OPTIONS];
```

For example, to export data from the `employees` table to a CSV file named `export.csv`, you would use the following command:

```sql
COPY (SELECT * FROM employees)
TO '/path/to/export.csv'
WITH (FORMAT csv, HEADER true);
```

Again, we're specifying that the file should be in CSV format and that the first row contains column headers.

## COPY Options

The `COPY` command offers several options, including:

- `FORMAT`: data file format, e.g., `csv`, `text`, or `binary`
- `HEADER`: whether the first row in the file is a header row, `true` or `false`
- `DELIMITER`: field delimiter for the text and CSV formats, e.g., `','`
- `QUOTE`: quote character, e.g., `'"'`
- `NULL`: string representing a null value, e.g., `'\\N'`

For a complete list of `COPY` options and their descriptions, refer to the [official PostgreSQL documentation](https://www.postgresql.org/docs/current/sql-copy.html).

Remember that to use the `COPY` command, you need to have the required privileges on the table and the file system. If you can't use the `COPY` command due to lack of privileges, consider using the `\copy` command in the `psql` client instead, which works similarly, but runs as the current user rather than the PostgreSQL server.
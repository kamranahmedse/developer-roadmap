# Import / Export using `COPY`

## Import Export using COPY in PostgreSQL

The `COPY` command in PostgreSQL provides a simple and efficient way to import and export data between a CSV (Comma Separated Values) file and a PostgreSQL database. It is an essential tool for any PostgreSQL DBA who wants to move data between different systems or quickly load large datasets.

### Import Data using COPY

To import data from a CSV file into a PostgreSQL table, you can use the following syntax:

```sql
COPY <table_name> (column1, column2, column3, ...)
FROM '<file_path>'
WITH (FORMAT csv, HEADER, DELIMITER ',', NULL '<null_value>', QUOTE '"', ESCAPE '\"', ENCODING '<encoding>');
```

- `<table_name>`: The name of the table that you want to import the data into.
- `(column1, column2, column3, ...)` : Specify the list of columns in the table that you want to populate with the data from the CSV.
- `<file_path>`: The path to the CSV file.
- `FORMAT csv`: Specifies that the file is in CSV format.
- `HEADER`: Indicates that the first line of the file contains the column names for the dataset, omit this if there's no header.
- `DELIMITER ','`: Specifies the character used to separate the fields in the CSV file (comma by default).
- `NULL '<null_value>'`: Specifies the string that represents a `NULL` value in the CSV file (empty string by default).
- `QUOTE '"'` : Specifies the character used to represent text data (double quote by default).
- `ESCAPE '\"'` : Specifies the character used to escape any quotes within text data (double quote by default).
- `ENCODING '<encoding>'`: Specifies the character encoding of the file (default is the server's encoding).

### Export Data using COPY

To export data from a PostgreSQL table to a CSV file, you can use the following syntax:

```sql
COPY (SELECT column1, column2, column3, ...
      FROM <table_name>
      WHERE ... )
TO '<file_path>'
WITH (FORMAT csv, HEADER, DELIMITER ',', NULL '<null_value>', QUOTE '"', ESCAPE '\"', ENCODING '<encoding>');
```

- `<table_name>`: The name of the table that you want to export the data from.
- `SELECT column1, column2, column3, ...`: The columns that you want to export.
- `WHERE ...`: Optional WHERE clause to filter the rows that you want to export.
- `<file_path>`: The path where the CSV file will be created.
- All other options are the same as in the import query.

Keep in mind that the `COPY` command can only be used by a superuser or a user with the appropriate permissions. Also, the `COPY` command works only with server-side file paths, so ensure that the path is accessible by the PostgreSQL server.

In case you want to import/export data using client-side paths or work with other formats like JSON, you can use the `\copy` meta-command in the `psql` command-line interface, which has similar syntax but works with client-side paths.
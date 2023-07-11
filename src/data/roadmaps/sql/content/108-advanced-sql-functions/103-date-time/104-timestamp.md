# TIMESTAMP

SQL `TIMESTAMP` is a data type that allows you to store both date and time. It is typically used to track updates and changes made to a record, providing a chronological time of happenings.

Depending on the SQL platform, the format and storage size can slightly vary. For instance, MySQL uses the 'YYYY-MM-DD HH:MI:SS' format and in PostgreSQL, it's stored as a 'YYYY-MM-DD HH:MI:SS' format but it additionally can store microseconds.

Here is how you can define a column with a `TIMESTAMP` type in an SQL table:

```sql
CREATE TABLE table_name (
   column1 TIMESTAMP,
   column2 VARCHAR(100),
   ...
);
```

A common use-case of `TIMESTAMP` is to have an automatically updated timestamp each time the row is updated. This can be achieved by setting the `DEFAULT` constraint to `CURRENT_TIMESTAMP`:

```sql
CREATE TABLE table_name (
   column1 TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
   column2 VARCHAR(100),
   ...
);
```

In MySQL, `ON UPDATE CURRENT_TIMESTAMP` can be used to automatically update the `TIMESTAMP` field to the current date and time whenever there is any change in other fields of the row. 

```sql
CREATE TABLE table_name (
   column1 TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
   column2 VARCHAR(100),
   ...
);
```

You can also insert or update records with a specific timestamp:

```sql
INSERT INTO table_name (column1, column2) VALUES ('2019-06-10 10:20:30', 'example data');

UPDATE table_name SET column1 = '2020-07-20 15:30:45' WHERE column2 = 'example data';
```

Remember that the format of the date and time you enter must correspond to the format used by the SQL platform you are using.
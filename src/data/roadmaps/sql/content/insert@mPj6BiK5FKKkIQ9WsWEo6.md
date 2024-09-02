# Insert

The INSERT statement is one of the DML (Data Manipulation Language) in SQL that allows us to insert new records to a table. 

Here's a basic syntax:

```sql
INSERT INTO table_name(column1, column2, ...)
VALUES (value1, value2, ...);

```

If you have multiple rows, then the syntax would look like this:

```sql
INSERT INTO table_name(column1, column2, ...)
VALUES
  (value1a, value2a, ...),
  (value1b, value2b, ...),
  (value1c, value2c, ...),
  ...
;
```

You can also insert query results into a table such as:

```sql
INSERT INTO target_table
SELECT column
FROM source_table;

```

 Learn more about INSERT statement here:

[SQL INSERT INTO Statement - W3Schools](https://www.w3schools.com/sql/sql_insert.asp)

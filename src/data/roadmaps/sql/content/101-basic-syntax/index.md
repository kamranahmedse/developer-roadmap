# Basic SQL Syntax

SQL, or Structured Query Language, uses a specific set of commands to interact with a database. It includes the use of keyword-like statements to accomplish several tasks such as creating, deleting, or modifying tables, retrieving, inserting, or modifying data.

The `SELECT` statement is used to retrieve data from a database. The data returned is stored in a result table, called the result-set.

```sql
SELECT column1, column2 FROM table_name;
```

The `INSERT INTO` statement is used to insert new rows of data in a table.

```sql
INSERT INTO table_name (column1, column2, column3)
VALUES (value1, value2, value3);
```

The `UPDATE` statement is used to modify existing records in a table. 

```sql
UPDATE table_name
SET column1 = value1, column2 = value2
WHERE condition;
```

The `DELETE` statement is used to remove rows from a table. 

```sql
DELETE FROM table_name WHERE condition;
```

The `CREATE TABLE` statement is used to create a new table in a database.

```sql
CREATE TABLE table_name (
    column1 datatype constraints,
    column2 datatype constraints,
    column3 datatype constraints
);
```

The `ALTER TABLE ` statement is used to add, delete/drop or modify columns in the existing table. It is also used to add and drop constraints on the existing table.

```sql
-- To add a column
ALTER TABLE table_name
ADD column_name datatype;

-- To delete/drop column
ALTER TABLE table_name
DROP COLUMN column_name;

-- To modify existing column
ALTER TABLE table_name
MODIFY COLUMN column_name datatype;
```

The `DROP TABLE` statement is used to drop an existing table in a database.

```sql
DROP TABLE table_name;
```

Learn more about SQL from the following resources:

- [@article@SQL Tutorial - Mode](https://mode.com/sql-tutorial/)
- [@article@SQL Tutorial](https://www.sqltutorial.org/)
- [@article@SQL Tutorial - W3Schools](https://www.w3schools.com/sql/default.asp)

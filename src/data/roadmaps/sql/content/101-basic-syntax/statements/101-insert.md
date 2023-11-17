# INSERT

The `INSERT` statement in SQL is used to add new rows of data to a table in the database. There are three forms of the `INSERT` statement: `INSERT INTO` values, `INSERT INTO` set, and `INSERT INTO` select.

## `INSERT INTO` values

The basic syntax for `INSERT INTO` values: 

```sql
INSERT INTO table_name (column1, column2, column3, ...)
VALUES (value1, value2, value3, ...);
```
This form of the `INSERT` statement specifies both the column names and the values to be inserted. 

## `INSERT INTO` set

In this form, you're able to insert data using the `SET` keyword. Here, you specify each column you want to insert data into, and then the data for that column.

```sql
INSERT INTO table_name 
SET column1 = value1, column2 = value2, ...;
```

## `INSERT INTO` select

The `INSERT INTO SELECT` statement is used to copy data from one table and insert it into another table. Or, to insert data into specific columns from another table.

```sql
INSERT INTO table_name1 (column1, column2, column3, ...)
SELECT column1, column2, column3, ...
FROM table_name2
WHERE condition;
```

In all cases, if you're inserting data into a table where some columns have default values, you don't need to specify those columns in your `INSERT INTO` statement.

Note: Be careful when inserting data into a database as SQL does not have a confirm command. So once you execute the insert statement, the records are inserted, and you can't undo the operation.
# Table

In SQL, a table is a collection of related data held in a structured format within a database. It consists of rows (records) and columns (fields).

A table is defined by its name and the nature of data it will hold, i.e., each field has a name and a specific data type.

## Table Creation

You can create a table using the `CREATE TABLE` SQL statement. The syntax is as follows:

```sql
CREATE TABLE table_name (
    column1 datatype,
    column2 datatype,
    column3 datatype,
   ....
);  
```
Here, `table_name` is the name of the table, `column1`, `column2`... are the names of the columns, and `datatype` specifies the type of data the column can hold (e.g., varchar, integer, date, etc.). 

## Table Manipulation

Once a table has been created, the `INSERT INTO` statement is used to insert new rows of data into the table. 

```sql
INSERT INTO table_name (column1, column2, column3,...)
VALUES (value1, value2, value3,...); 
```
The `SELECT` statement is used to select data from the table.

```sql
SELECT column1, column2,...
FROM table_name;
```
The `UPDATE` statement is used to modify existing records.

```sql
UPDATE table_name
SET column1 = value1, column2 = value2,...
WHERE condition;
```
And, finally, the `DELETE` statement is used to delete existing records.

```sql
DELETE FROM table_name WHERE condition;
```

These basic operations allow for full manipulation of tables in SQL, letting users to manage their data effectively.
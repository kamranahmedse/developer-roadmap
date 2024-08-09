# Create Table

The `CREATE TABLE` statement in SQL is a Data Definition Language (DDL) command used to create a new table in the database. 

## SQL CREATE TABLE Syntax

The syntax for SQL `CREATE TABLE` is as follows:

```sql
CREATE TABLE table_name (
    column1 datatype,
    column2 datatype,
    column3 datatype,
   ....
);
```

- `table_name` is the name of the table that you want to create.
- `column1, column2,...` are the columns in the table.
- `datatype` is the data type for the column, such as varchar, int, date, etc.

## SQL CREATE TABLE Example 

Here is an example of the `CREATE TABLE` statement:

```sql
CREATE TABLE Employees (
    ID int,
    Name varchar(255),
    Salary int,
    Department varchar(255),
    Position varchar(255)
);
``` 

This SQL command creates a new table named `Employees` with five columns, named 'ID', 'Name', 'Salary', 'Department', and 'Position'. The data types are int for the 'ID' and 'Salary', and varchar(255) for the others.

## SQL CREATE TABLE with NOT NULL 

The `NOT NULL` constraint enforces a column to not accept null values. When creating a new table, you can add this constraint. Here is a practical example:

```sql
CREATE TABLE Employees (
    ID int NOT NULL,
    Name varchar(255) NOT NULL,
    Salary int,
    Department varchar(255),
    Position varchar(255)
);
```

In the example above, the 'ID' and 'Name' must always have a value. They cannot be unassigned or undefined.
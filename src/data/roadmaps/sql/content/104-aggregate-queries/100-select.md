# SELECT

`SELECT` is one of the most widely used commands in SQL. This command is used to select data from a database. The data returned is stored in a results table, also called the result-set.

## Syntax

The simplest way to use the `SELECT` statement is to return all columns from a table. This can be done with the following syntax:

```sql
SELECT * FROM table_name;
```

This will return all fields (columns) of all records (rows) from the table.

If you want to select just certain columns, you can specify them by name, separated by commas:

```sql
SELECT column_name1, column_name2 FROM table_name;
```

## SELECT DISTINCT

The `SELECT DISTINCT` statement is used to return only unique values in the output. It can be used to eliminate duplicate values in the returned data.

```sql
SELECT DISTINCT column_name FROM table_name;
```

## WHERE Clause

The `WHERE` clause is used to filter records. The `WHERE` clause is used to extract only those records that fulfill a specified condition.

```sql
SELECT column_name FROM table_name WHERE condition;
```

## ORDER BY

The `ORDER BY` keyword is used to sort the result-set in ascending or descending order. The `ORDER BY` keyword sorts the records in ascending order by default. If you want to sort the records in descending order, you can use the `DESC` keyword.

```sql
SELECT column_name FROM table_name ORDER BY column_name ASC|DESC;
```

## Aggregate Functions

Aggregate functions in SQL are functions where the values of multiple rows are grouped together to form a single value of more significant meaning, such as a list, a set, or a sum. Some examples include `SUM()`, `COUNT()`, `MIN()`, `MAX()`, and `AVG()`.

```sql
SELECT COUNT(column_name) FROM table_name WHERE condition;
SELECT AVG(column_name) FROM table_name WHERE condition;
SELECT SUM(column_name) FROM table_name WHERE condition;
SELECT MIN(column_name) FROM table_name WHERE condition;
SELECT MAX(column_name) FROM table_name WHERE condition;
```

## GROUP BY

The `GROUP BY` statement is often used with aggregate functions (`COUNT`, `MAX`, `MIN`, `SUM`, `AVG`) to group the result-set by one or more columns.

```sql
SELECT column_name1, COUNT(column_name2) FROM table_name WHERE condition GROUP BY column_name1 ORDER BY COUNT(column_name2) DESC;
```

## HAVING Clause

The `HAVING` clause was added to SQL because the `WHERE` keyword could not be used with aggregate functions. It works like the WHERE clause but on grouped records.

```sql
SELECT column_name, COUNT(column_name) FROM table_name GROUP BY column_name HAVING COUNT(column_name) > value;
```

The above are the most common uses of the `SELECT` keyword in SQL. There are other keywords and functions you can use to manipulate the data as well. These will give you a good start on using `SELECT` in your SQL queries.

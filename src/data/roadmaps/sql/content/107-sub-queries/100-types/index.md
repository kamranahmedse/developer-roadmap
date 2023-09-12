# Types of Sub Queries

Subqueries, sometimes referred to as inner queries or nested queries, are queries that are embedded within the clause of another SQL query. There are different types of SQL subqueries that are frequently used including Scalar, Row, Column, and Table subqueries. 

## Scalar Subqueries

A scalar subquery is a query that returns exactly one column with a single value. This type of subquery can be used anywhere in your SQL where expressions are allowed.

Example:

```sql
    SELECT column_name [, column_name ]
    FROM   table1 [, table2 ]
    WHERE  column_name operator
           (SELECT column_name [, column_name ]
            FROM table_name 
            WHERE condition);
```

## Row Subqueries

Row subqueries are used to return one or more rows to the outer SQL select query. However, the subquery returns multiple columns and rows, so it cannot be directly used where scalar expressions are used.

Example:

```sql
    SELECT column_name [, column_name ]
    FROM   table1 [, table2 ]
    WHERE  (column_name [, column_name ])
          IN (SELECT column_name [, column_name ]
              FROM table_name 
              WHERE condition);
```

## Column Subqueries 

Column Subqueries are used to return one or more columns to the outer SQL select query. They are used when the subquery is expected to return more than one column to the main query.

Example:

```sql
    SELECT column_name [, column_name ]
    FROM   table1 [, table2 ]
    WHERE  (SELECT column_name [, column_name ]
            FROM table_name 
            WHERE condition);
```

## Table Subqueries 

Table subqueries are used in the FROM clause and return a table that can be used as a table-reference in an SQL statement. They come in handy when you want to perform operations such as joining multiple tables, union data from multiple sources, etc.

Example:

```sql
    SELECT column_name [, column_name ]
    FROM
        (SELECT column_name [, column_name ]
         FROM   table1 [, table2 ])
    WHERE  condition;
```
Remember that not all SQL databases support all types of subqueries. Learning how and when to utilize each form is an essential aspect of constructing effective SQL queries.
# Set Operations

## Set Operations in PostgreSQL

In this section, we will discuss set operations in PostgreSQL. In relational algebra, set operations are the foundation of many advanced queries. PostgreSQL supports several set operations, including UNION, INTERSECT, and EXCEPT, that can be used to combine, compare and analyze data from multiple tables or subqueries.

### UNION

`UNION` combines the result sets of two or more `SELECT` statements into a single result set. It removes duplicate rows by default. If you want to preserve duplicates, you can use `UNION ALL`.

```sql
SELECT column1, column2, ...
FROM table1
UNION [ALL]
SELECT column1, column2, ...
FROM table2;
```

#### Example:

```sql
SELECT product_name, price
FROM laptops
UNION
SELECT product_name, price
FROM tablets;
```

### INTERSECT

`INTERSECT` returns the common rows between the result sets of two `SELECT` statements. Similar to `UNION`, it removes duplicate rows unless `ALL` is specified. 

```sql
SELECT column1, column2, ...
FROM table1
INTERSECT [ALL]
SELECT column1, column2, ...
FROM table2;
```

#### Example:

```sql
SELECT product_name, price
FROM laptop_sales
INTERSECT
SELECT product_name, price
FROM tablet_sales;
```

### EXCEPT

`EXCEPT` returns the rows from the first `SELECT` statement that do not appear in the result set of the second `SELECT` statement. It also removes duplicate rows, unless `ALL` is specified.

```sql
SELECT column1, column2, ...
FROM table1
EXCEPT [ALL]
SELECT column1, column2, ...
FROM table2;
```

#### Example:

```sql
SELECT product_name, price
FROM laptop_sales
EXCEPT
SELECT product_name, price
FROM tablet_sales;
```

### Rules and Considerations

- The number and order of columns in both `SELECT` statements must be the same.
- Data types of each corresponding column between the two `SELECT` statements must be compatible.
- The names of the columns in the result set will be determined by the first `SELECT` query.
- The result set will be sorted only if an `ORDER BY` clause is added to the end of the final `SELECT` query.

To summarize, set operations enable us to combine, compare, and analyze data from multiple sources in PostgreSQL. They are powerful tools for data manipulation and can significantly improve the efficiency of your queries when used effectively.
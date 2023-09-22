# Advanced SQL Functions

Advanced SQL functions provide complex data manipulation and query capabilities enabling the user to perform tasks that go beyond the capabilities of basic SQL commands. 

## Window Function 

Windowing Functions provide the ability to perform calculations across sets of rows related to the current query row.

```sql
SELECT productName, productLine, buyPrice,
       AVG(buyPrice) OVER(PARTITION BY productLine) as avg_price
FROM products
ORDER BY productLine, buyPrice;
```

## Aggregate Function

Aggregate functions return a single result row based on groups of rows, rather than on single rows.

```sql
SELECT COUNT(*) FROM products;
```

## Analytic Functions

Analytic functions compute an aggregate value based on a group of rows. They differ from aggregate functions in that they return multiple rows for each group.

```sql
SELECT department_id, last_name, hire_date, 
       COUNT(*) OVER (PARTITION BY department_id) as dept_count,
       RANK() OVER (PARTITION BY department_id ORDER BY hire_date) as ranking
FROM employees;
```

## Scalar Function

A scalar function returns a single value each time it is invoked. It is based on the input value. 

```sql
SELECT UPPER(productName) FROM products;
```

## Stored Procedures

Stored Procedures are a prepared SQL code that you can save so the code can be reused over and over again.

```sql
CREATE PROCEDURE SelectAllProducts @Product varchar(50)
AS
SELECT * FROM products WHERE Product = @Product
GO;
```

## String Functions 

Functions that manipulate the string data types. For example, `LEFT()`, `LENGTH()`, `LOWER()`, etc.

```sql
SELECT LEFT('This is a test', 4);
```

## Date Functions 

Functions that manipulate the date data types. For example, `GETDATE()`, `DATEADD()`, `DATEDIFF()`, etc.

```sql
SELECT GETDATE() AS CurrentDateTime;
```
Remember, not all types or functions are supported by every SQL distribution but most of them have some sort of equivalent.
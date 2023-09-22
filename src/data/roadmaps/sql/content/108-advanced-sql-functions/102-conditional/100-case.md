# CASE

`CASE` is a conditional statement in SQL that performs different actions based on different conditions. It allows you to perform IF-THEN-ELSE logic within SQL queries. It can be used in any statement or clause that allows a valid expression.

There are two forms of the `CASE` statement:

1. **Simple CASE expression** - It compares an expression to a set of simple expressions to return a result.

```sql
SELECT column1, column2, 
(CASE 
    WHEN condition1 THEN result1
    WHEN condition2 THEN result2
    ...
    ELSE result 
END) 
FROM table_name;
```

2. **Searched CASE expression** - It evaluates a set of Boolean expressions to return a result.

```sql
SELECT column1, column2,
(CASE
    WHEN condition1 THEN result1
    WHEN condition2 THEN result2
    ...
    ELSE result
END) 
FROM table_name;
```

In both forms, `CASE` returns a result_1, result_2, ..., if condition_1, condition_2, ... is true. If no conditions are true, it returns the value in the `ELSE` clause. If the `ELSE` clause is omitted and no conditions are true, it returns NULL.

Here's a concrete example:

```sql
SELECT OrderID, Quantity,
 (CASE
     WHEN Quantity > 30 THEN 'Over 30'
     WHEN Quantity = 30 THEN 'Equals 30'
     ELSE 'Under 30'
 END) AS QuantityText
FROM OrderDetails;
```

From the "OrderDetails" table, the statement lists 'OrderID', 'Quantity', and a column named 'QuantityText' that displays 'Over 30' if 'Quantity > 30' or 'Equals 30' if 'Quantity = 30' or 'Under 30' if both conditions are false.
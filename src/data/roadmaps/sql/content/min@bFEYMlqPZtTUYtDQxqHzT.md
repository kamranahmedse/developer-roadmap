# MIN

`MIN` is an SQL aggregate function used to return the smallest value in a selected column. It is useful in querying tables where users want to identify the smallest or least available value in datasets. `MIN` ignores any null values in the dataset.

Syntax: 

```sql
SELECT MIN(column_name)
FROM table_name
WHERE condition;
```

In the case where `column_name` belongs to a numeric data type (Integers, Float, etc.), `MIN` returns the smallest numeric value in the column. 

If `column_name` belongs to datetime types (Date, Time, etc.), `MIN` returns the earliest date or time.

If `column_name` belongs to string types (Char, Text, etc.), `MIN` returns the lowest value in lexicographic order (similar to alphabetic order).

## Examples:

Consider a table, named `Orders`, with the following layout:

| OrderID | CustomerID | OrderDate |
|---------|-------------|------------|
| 1           | C01           | 2020-10-10 |
| 2           | C02           | 2020-09-05 |
| 3           | C01           | 2020-08-21 |

1. To find the earliest order date in the `Orders` table, the `MIN` function is used in the following way:

```sql
SELECT MIN(OrderDate) AS EarliestOrder
FROM Orders;
```

The result of this query will be `2020-08-21`.

2. Suppose we have a Prices table with items and their prices. To find the lowest price, use:

```sql
SELECT MIN(price) AS LowestPrice
FROM Prices;
```

This query will return the smallest value in the price column.

One important usage is when it is used along with the `GROUP BY` clause to find the minimum value in each group. 

Example, to find the earliest order date for each customer:

```sql
SELECT CustomerID, MIN(OrderDate) AS EarliestOrder
FROM Orders
GROUP BY CustomerID;
```

This query will return the earliest order date for each customer.
# HAVING

`HAVING` is a clause in SQL that allows you to filter result sets in a `GROUP BY` clause. It is used to mention conditions on the groups being selected. In other words, `HAVING` is mainly used with the `GROUP BY` clause to filter the results that a `GROUP BY` returns. 

It’s similar to a `WHERE` clause, but operates on the results of a grouping. The `WHERE` clause places conditions on the selected columns, whereas the `HAVING` clause places conditions on groups created by the `GROUP BY` clause.

## Syntax 

The basic syntax is as follows:
```sql
SELECT column_name, function(column_name)
FROM table_name
WHERE condition
GROUP BY column_name
HAVING function(column_name) condition value;
```

## Example

Suppose we have a `Sales` table with the following data:

| SaleID | Product | Quantity |
|--------|---------|----------|
| 1      | A       | 30       |
| 2      | B       | 20       |
| 3      | A       | 100      |
| 4      | B       | 50       |
| 5      | C       | 60       |
| 6      | A       | 70       |

And we want to find products which have total quantity sold more than 100. We can use the `HAVING` clause as follows:

```sql
SELECT Product, SUM(Quantity) as TotalQuantity
FROM Sales
GROUP BY Product
HAVING TotalQuantity > 100;
```

In this query,

- `GROUP BY Product` would group the sales figures by Product.
- `SUM(Quantity)` would calculate total quantity sold for each product.
- `HAVING TotalQuantity > 100` would filter out the groups which have total quantity sold less than or equal to 100.-
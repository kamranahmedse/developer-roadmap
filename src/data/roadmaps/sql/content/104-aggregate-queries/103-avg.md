# AVG

The `AVG()` function in SQL is an aggregate function that returns the average value of a numeric column. It calculates the sum of values in a column and then divides it by the count of those values.

Syntax:
```sql
SELECT AVG(column_name)
FROM table_name;
```
This statement will return the average value of the specified column.

## Example Usage of AVG:

Consider the following table `Orders`:

| OrderID | CustomerID | Quantity |
|---------|------------|----------|
| 1       | A          | 30       |
| 2       | A          | 40       |
| 3       | B          | 20       |
| 4       | B          | 60       |
| 5       | C          | 50       |
| 6       | C          | 10       |

Let's calculate the average quantity in the `Orders` table:
```sql
SELECT AVG(Quantity) AS AvgQuantity
FROM Orders;
```
The result is 35. This value is the average of all `Quantity` values in the table.

It's also possible to group the average function by one or more columns. For example, to find the average quantity of order per customer, we can write:
```sql
SELECT CustomerID, AVG(Quantity) as AvgQuantity
FROM Orders
GROUP BY CustomerID;
```
It will calculate the average quantity for each customer and display the result along with the associated customer's ID.

> Note: The `AVG()` function works only with numeric data types (`INT`, `FLOAT`, `DECIMAL`, etc.). It will return an error if used with non-numeric data types.

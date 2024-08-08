# SUM

The `SUM()` function in SQL is used to calculate the sum of a column. This function allows you to add up a column of numbers in an SQL table. 

The syntax for SUM is as follows:

```sql
SELECT SUM(column_name) FROM table_name;
```

Where `column_name` is the name of the column you want to calculate the sum of, and `table_name` is the name of the table where the column is.

For example, consider the following `ORDER` table:

```
|   OrderID  | Company | Quantity |
|------------|---------|----------|
|     1      |     A   |    30    |
|     2      |     B   |    15    |
|     3      |     A   |    20    |
```

If you want to find the total quantity, you can use `SUM()`:

```sql
SELECT SUM(Quantity) AS TotalQuantity FROM Order;
```

Output will be:

```
| TotalQuantity |
|---------------|
|       65      |
```

**Note:** The `SUM()` function skips NULL values.

One of the common use cases of `SUM()` function is in conjunction with `GROUP BY` to get the sum for each group of rows.

Example:

```sql
SELECT Company, SUM(Quantity) AS TotalQuantity 
FROM Order 
GROUP BY Company;
```

This will give us the sum of `Quantity` for each `Company` in the `Order` table.

```
| Company | TotalQuantity |
|-----------|----------------|
|     A     |           50     |
|     B     |           15     |
```

Notably, in all databases, including MySQL, PostgreSQL, and SQLite, the `SUM()` function operates the same way.

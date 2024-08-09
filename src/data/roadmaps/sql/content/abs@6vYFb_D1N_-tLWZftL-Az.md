# ABS

The `ABS` function in SQL is used to return the absolute value of a number, i.e., the numeric value without its sign. The function takes a single argument which must be a number (integer, float, etc.) and returns the absolute, non-negative equivalent.

The general syntax for the ABS function is as follows: 

```sql
ABS(expression)
```

In the syntax above, the `expression` is required and can either be a literal number, a column name, the result of another function, or any valid SQL expression that resolves to a numeric value.

## Examples

Consider a database table `Orders`:

| OrderID | Product | Quantity |
|---------|---------|----------|
| 1       | Apple   | -5       |
| 2       | Banana  | 10       |
| 3       | Cherry  | -15      |

If you want to get the absolute value of the 'Quantity' column, you could use the `ABS`function like this:

```sql
SELECT OrderID, Product, ABS(Quantity) as 'Absolute Quantity'
FROM Orders;
```

The output will be:

| OrderID | Product | Absolute Quantity |
|---------|---------|-------------------|
| 1       | Apple   | 5                 |
| 2       | Banana  | 10                |
| 3       | Cherry  | 15                |

As you can see, the negative values in the 'Quantity' column have been converted to positive values by the `ABS` function.
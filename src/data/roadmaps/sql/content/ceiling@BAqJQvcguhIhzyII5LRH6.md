# CEILING

`CEILING` is an advanced SQL function that is used to round up values. The function takes a single argument, which is a numeric or decimal number, and returns the smallest integer that is greater than or equal to the supplied number.

The syntax for using the `CEILING` function is:

```sql
CEILING (numeric_expression)
```

The `numeric_expression` is an expression of the exact numeric or approximate numeric data type categories, or types that can be implicitly converted to one of these categories.

For example, you have a table called 'Products' with a 'Price' column. Here's how you can use the `CEILING` function to round up all the prices to the nearest whole number:

```sql
SELECT ProductName, Price, CEILING (Price) AS RoundedUpPrice
FROM Products;
```

In this example, if the original price was $10.25, the `RoundedUpPrice` will be $11. This is because the `CEILING` function rounds up the 'Price' value to the nearest whole number.

It's essential to remember that `CEILING` always rounds up. So even if the Price is $10.01, the RoundedUpPrice according to `CEILING` would still be $11. If you want to round to the nearest whole number, you might want to use the `ROUND` function instead. 

Another important note is that the return type of `CEILING` will be of the same type as the provided numeric expression. For instance, if you supply a numeric expression of type decimal, the return type will also be of type decimal.
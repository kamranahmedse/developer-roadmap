# FLOOR

The SQL `FLOOR` function is used to round down any specific decimal or numeric value to its nearest whole integer. The returned number will be less than or equal to the number given as an argument.

One important aspect to note is that the `FLOOR` function's argument must be a number and it always returns an integer.

## Syntax

The syntax of using the `FLOOR` function in SQL is as follows:
```sql
FLOOR (number);
```

## Example Usage

Here's a simple example of its usage:

```sql
SELECT FLOOR(25.75);
```
The above query will return `25` as the result, as that's the nearest integer less than `25.75`.

Suppose we have a table called `Orders` with a column `SalePrice` that includes decimal values. If we wanted to round down the `SalePrice` values to the nearest whole numbers, we could use a query like this:

```sql
SELECT FLOOR(SalePrice) AS RoundedSalePrice
FROM Orders;
```

This would output a new column `RoundedSalePrice` where all the sale prices have been rounded down to the nearest integers.
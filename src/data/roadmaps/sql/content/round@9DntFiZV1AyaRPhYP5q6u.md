# ROUND

The `ROUND` function in SQL is used to round a numeric field to the nearest specified decimal or integer. 

Most usually, `ROUND` accepts two arguments. The first one is the value that needs to be rounded, and the second is the number of decimal places to which the first argument will be rounded off. When dealing with decimals, SQL will round up when the number after the decimal point is 5 or higher, whereas it will round down if it's less than 5.

## Syntax

The basic syntax for `ROUND` can be described as follows:

```sql
ROUND ( numeric_expression, length [ , function ] )
```
- `numeric_expression`: A floating point number to round.
- `length`: The precision to which `numeric_expression` is to be rounded. When `length` is a positive number, rounding affects the right side of the decimal point. If `length` is negative, rounding affects the left side of the decimal point.
- `function`: Optional parameter to determine the operation to perform. If this is omitted or 0, the `numeric_expression` is rounded. If this is 1, the `numeric_expression` is truncated.

## Example 1:

Round off a decimal to the nearest whole number.

```sql
SELECT ROUND(125.215);
```
This will result in `125`.

## Example 2: 

Round off a number to a specified decimal place.

```sql
SELECT ROUND(125.215, 1);
```
This will result in `125.2` as the second decimal place (5) is less than 5.

## Example 3:

Round off the left side of the decimal.

```sql
SELECT ROUND(125.215, -2);
```
This will result in `100` as rounding now affects digits before the decimal point.

Whenever you need to round off numeric data in SQL, the `ROUND` function is a valuable tool to have in your kit. It proficiently handles both positive and negative rounding, and its simple syntax makes it extremely user-friendly.

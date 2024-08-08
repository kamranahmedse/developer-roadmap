# DATEADD

`DATEADD` is a built-in function in SQL that allows you to add or subtract units of time from a specified date. The function takes three parameters:

- An interval type (such as day, month, year, hour, minute, second)
- A number (which can be either positive, for future dates, or negative, for past dates)
- A date from which calculation will be based.

The usage of this function can be especially useful when you need to perform operations on dates, such as finding a date "n" days before or after a specified date, or getting the first or last day of a month.

## Syntax

The generic syntax for `DATEADD` is:

```sql
DATEADD(interval, number, date)
```
Here's what each param means:

- `interval`: The part of date to which an integer value will be added. This could be a year, quarter, month, day, hour, minute, second, millisecond, microsecond, or nanosecond.

- `number`: The value to add. The value can either be negative to get dates in the past or positive to get dates in the future.

- `date`: The date or datetime expression to which the interval and number are added.

For example, if we want to add three days to the date '2022-01-01', we would write:

```sql
SELECT DATEADD(day, 3, '2022-01-01') as NewDate
```

The result would be: `2022-01-04`.

You can substitute 'day' with any of the accepted interval types to add different units of time.

## Sample Query

If you have a table called `Orders` with a `DateTime` field `OrderDate` and you want to find all orders placed in the next seven days, you can use the `DATEADD` function as follows:

```sql
SELECT * FROM Orders
WHERE OrderDate <= DATEADD(day, 7, GETDATE())
``` 

This will return all orders from now until a week from now.

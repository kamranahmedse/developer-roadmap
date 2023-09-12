# lead

In SQL, the `LEAD` function is a kind of window function that allows you to look at a row after a certain row, and use its value in calculations. `LEAD` function returns the value from the next row (or a subsequent row) of the current row in the table.

## Usage

The `LEAD` function takes three arguments:

1. `value_expression` - the column or expression whose next value will be returned.
2. `offset` - determines how many rows ahead to retrieve the value from. If it's omitted, then its default value is 1.
3. `default_value` - the value returned when the `LEAD` function navigates past the last row. If it's omitted, it returns NULL.

The syntax of the `LEAD` function is as follows:

```sql
LEAD(value_expression, [offset], [default_value]) OVER ([PARTITION BY partition_expression] ORDER BY sort_expression [ASC | DESC])
```

## Example

Consider a simple example where you have a "sales" table and you want to compare each monthly sale with the sale of the next month.

```sql
SELECT
    month,
    sale,
    LEAD(sale) OVER (ORDER BY month) NextMonthSale
FROM
    sales;
```

This SQL command will give an output where each row displays the sale of the current month and the sale amount of the next month. 

Please note that 'LEAD' function might return 'NULL' if there are no subsequent rows in window frame to fetch.
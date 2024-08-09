# lag

`LAG` is a window function provided by SQL that allows us to fetch data from a previous row in the same result set without using a self-join. This function is commonly used in data analysis, for instance, comparing sales in a certain period with sales in a previous period. 

The general syntax for using the `LAG` function is as follows:

```sql
LAG (expression [, offset [, default]])
OVER (
    [PARTITION BY partition_expression, ... ]
    ORDER BY sort_expression [ASC | DESC], ...
)
```

Let's break down this syntax:

- `expression`: This is the value to return from a previous row. If you specify multiple expressions, `LAG` treats them as a single compound expression.
- `offset`: This is an optional section where you specify the number of steps to reachback. By default, the `offset` is 1, meaning that it gets the value from a previous row.
- `default`: This is another optional section where you define a value to return if the `LAG` function accesses beyond the scope of partition. By default, it returns NULL.

## Example 

Suppose we have the following 'sales' table:

| Year | Sales |
| ---- | ----- |
| 2017 |  200  |
| 2018 |  250  |
| 2019 |  300  |
| 2020 |  350  |

You'd like to compare the sales of each year to the sales of the previous year. Here's how you can do it using the `LAG` function:

```sql
SELECT Year,
       Sales,
       LAG(Sales) OVER (ORDER BY Year) AS PrevYearSales
FROM sales;
```

This should produce:

| Year | Sales | PrevYearSales |
| ---- | ----- | ------------- |
| 2017 |  200  |     NULL      |
| 2018 |  250  |     200       |
| 2019 |  300  |     250       |
| 2020 |  350  |     300       |

In this example, `LAG` fetched the sales of the previous year ordered by the 'Year' column. The sales in 2017 do not have a previous year, so `LAG` returns NULL.
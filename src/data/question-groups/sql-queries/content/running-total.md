Let's use a table `Sales` as a reference for this query. It has three columns: `id`, `day` which represents the day of the week, and `amount` which is the amount sold in US Dollars. The table looks like this:

| id | day       | amount |
| -- | --------- | ------ |
| 1  | Monday    | 200    |
| 2  | Tuesday   | 300    |
| 3  | Wednesday | 600    |
| 4  | Thursday  | 390    |
| 5  | Friday    | 900    |

The query to calculate the running total is:

```sql
SELECT
  id,
  sale_date,
  amount,
  SUM(amount) OVER (ORDER BY sale_date) AS running_total
FROM
  sales;
```

The query uses a Window function **OVER** to sum the amount for each row of data and saving the running total. It gets the total for each day and adds it to the previous totals. The result of the query looks like this:

| id | day       | amount | running_total |
| -- | --------- | ------ | ------------- |
| 1  | Monday    | 200    | 200           |
| 2  | Tuesday   | 300    | 500           |
| 4  | Thursday  | 390    | 1100          |
| 3  | Wednesday | 600    | 1490          |
| 5  | Friday    | 900    | 2390          |

You can observe from the image that the last column is `running_total,` which takes the amount for the current day and adds it to its previous value to get its current value. 
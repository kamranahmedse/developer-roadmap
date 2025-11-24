**LAG()** and **LEAD()** are window functions used to retrieve data from rows before and after a specified row. You can also refer to them as positional SQL functions.

**LAG()** allows you to access a value stored in rows before the current row. The row may be directly before or some rows before. Let's take a look at the syntax:

```sql
LAG(column_name, offset, default_value)
```

It takes three arguments.

- **column_name**: This specifies the column to fetch from the previous row.
- **offset**: This is an optional argument and specifies the number of rows behind to look at. The default is 1.
- **default_value**: This is the value to assign when no previous row exists. It is optional, and the default is NULL.

Using the `Sales` table, let's illustrate the **LAG()** function. The query is used to find the previous day sales. LAG() is useful when you want to create reports of past events.

| id | day       | amount |
| -- | --------- | ------ |
| 1  | Monday    | 200    |
| 2  | Tuesday   | 300    |
| 3  | Wednesday | 600    |
| 4  | Thursday  | 390    |
| 5  | Friday    | 900    |
| 6  | Saturday  | 600    |

```sql
SELECT
  id,
  day,
  amount,
  LAG(amount) OVER (ORDER BY id) AS previous_day_sales
FROM
  sales;
```

The result of the query looks like this:

| id | day       | amount | previous_day_sales |
| -- | --------- | ------ | ------------------ |
| 1  | Monday    | 200    | null               |
| 2  | Tuesday   | 300    | 200                |
| 3  | Wednesday | 600    | 300                |
| 4  | Thursday  | 390    | 600                |
| 5  | Friday    | 900    | 390                |
| 6  | Saturday  | 600    | 900                |

You use the **LEAD()** function to get data from rows after the current row. Its syntax is similar to that of the **LAG()** function. You can use it for forecasting future trends by looking ahead.

The query using the **LEAD()** function is shown below.

```sql
SELECT
  id,
  day,
  amount,
  LEAD(amount) OVER (ORDER BY id) AS previous_day_sales
FROM
  sales;
```

| id | day       | amount | previous_day_sales |
| -- | --------- | ------ | ------------------ |
| 1  | Monday    | 200    | 300                |
| 2  | Tuesday   | 300    | 600                |
| 3  | Wednesday | 600    | 390                |
| 4  | Thursday  | 390    | 900                |
| 5  | Friday    | 900    | 600                |
| 6  | Saturday  | 600    | null               | 
The **RANK()** function assigns each row a rank according to an ascending or descending order. If there are matching values, it assigns them the same position and then skips the next number for the next rank. For example, if two rows have equivalent values and are both assigned rank 1, the next rank would be 3 instead of 2.

![Window functions](https://assets.roadmap.sh/guest/window-functions-42dn5.png)

Let's use the `Sales` table from the previous question to illustrate the **RANK()** function. The query to rank in order of the amount looks like this:

```sql
SELECT
  id,
  day,
  amount,
  RANK() OVER (ORDER BY amount DESC) AS amount_rank
FROM
  sales;
```

The result is shown in the image below. You will observe that the amount 900 takes the first rank and 200 the lowest rank. Also, there is a gap between rank 2 and 4 because two values have the same rank. You can also infer that the most sales were on Friday and the least on Monday. 

| id | day       | amount | amount_rank |
| -- | --------- | ------ | ----------- |
| 5  | Friday    | 900    | 1           |
| 3  | Wednesday | 600    | 2           |
| 6  | Saturday  | 600    | 2           |
| 4  | Thursday  | 390    | 4           |
| 2  | Tuesday   | 300    | 5           |
| 1  | Monday    | 200    | 6           |

**DENSE_RANK()** function is similar to **RANK()** in that it assigns ranks to rows, but the difference is that **DENSE_RANK** does not leave a gap when there are two or more equivalent values. Let's illustrate it with the `Sales` table from above. The query is shown below.

```sql
SELECT
  id,
  day,
  amount,
  DENSE_RANK() OVER (ORDER BY amount DESC) AS amount_rank
FROM
  sales;
```

The result is shown below. As you will notice, there is no gap between the ranks like in the **RANK** function.

| id | day       | amount | amount_rank |
| -- | --------- | ------ | ----------- |
| 5  | Friday    | 900    | 1           |
| 3  | Wednesday | 600    | 2           |
| 6  | Saturday  | 600    | 2           |
| 4  | Thursday  | 390    | 3           |
| 2  | Tuesday   | 300    | 4           |
| 1  | Monday    | 200    | 5           |

**ROW_NUMBER** assigns a unique number to each row depending on the order you specify. It does not skip numbers; even though there are equivalent values, it assigns them different numbers, unlike **RANK** and **DENSE_RANK** functions that give them the same rank.

Let's use the same `Sales` table to illustrate. The query below shows how to use the **ROW_NUMBER** function.

```sql
SELECT
  id,
  day,
  amount,
  ROW_NUMBER() OVER (ORDER BY amount DESC) AS rowNumber
FROM
  sales;
```

The result is shown in the image below. You will notice that the `rownumber` column increases, and even though there are matching values, it just assigns a unique row number to each.

| id | day       | amount | amount_rank |
| -- | --------- | ------ | ----------- |
| 5  | Friday    | 900    | 1           |
| 3  | Wednesday | 600    | 2           |
| 6  | Saturday  | 600    | 3           |
| 4  | Thursday  | 390    | 4           |
| 2  | Tuesday   | 300    | 5           |
| 1  | Monday    | 200    | 6           | 
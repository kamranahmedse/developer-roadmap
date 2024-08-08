# dense_rank

`DENSE_RANK` is a window function in SQL that assigns a rank to each row within a window partition, with no gaps in the ranking numbers. 

Unlike the `RANK` function, `DENSE_RANK` does not skip any rank (positions in the order). If you have, for example, 1st, 2nd, and 2nd, the next rank listed would be 3rd when using `DENSE_RANK`, whereas it would be 4th using the `RANK` function. 

The `DENSE_RANK` function operates on a set of rows, called a window, and in that window, values are compared to each other.

Here is a general syntax of `DENSE_RANK` function in SQL:
```sql
DENSE_RANK ( ) OVER (
    [ < partition_by_clause > ] 
    [ < order_by_clause > ]
    )
```
- `partition_by_clause` - Divides the window into smaller sets or partitions.
- `order_by_clause` - Determines the order of data inside each partition to further work with the ranking functions.

Let's say you have a table called 'Employees' with the following data:

| ID | Name | Salary |
|---|---|---|
| 1 | John | 50000 |
| 2 | Mike | 60000 |
| 3 | Mary | 60000 |
| 4 | Alice | 55000 |

Our task can be to rank these employees based on their salaries. The SQL query will be:

```sql
SELECT Name, Salary,
DENSE_RANK () OVER (ORDER BY Salary Desc) AS Rank
FROM Employees
```
When this query is run, the `DENSE_RANK` function will assign a rank to every row, with the highest salary being ranked as 1:
  
| Name | Salary | Rank |
|---|---|---|
| Mike | 60000 | 1 |
| Mary | 60000 | 1 |
| Alice | 55000 | 2 |
| John | 50000 | 3 |

This table clearly shows how the `DENSE_RANK` function provides rank without skipping any rank in case of a tie between the salaries of Mary and Mike.
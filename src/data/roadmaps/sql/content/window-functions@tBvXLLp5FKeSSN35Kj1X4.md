# Window Functions

SQL Window functions enable you perform calculations on a set of rows related to the current row. This set of rows is known as a 'window', hence 'Window Functions'. 

These are termed so because they perform a calculation across a set of rows which are related to the current row - somewhat like a sliding window.

There are four types of window functions in SQL:

- **Aggregate functions:** These functions compute a single output value for a group of input values (like averages, sums).

```sql
SELECT department, salary,
AVG(salary) OVER (PARTITION BY department) as avg_departmental_salary
FROM employee;
```

- **Ranking functions:** These functions allocate a unique rank to each row within each window partition. 

```sql
SELECT department, salary,
RANK() OVER (PARTITION BY department ORDER BY salary DESC) as salary_rank
FROM employee;
```

- **Value functions:** These functions provide information about the window partition or the row's position within it, for example - `FIRST_VALUE`, `LAST_VALUE`, `NTH_VALUE`.

```sql
SELECT department, salary,
FIRST_VALUE(salary) OVER (PARTITION BY department ORDER BY salary DESC) as highest_salary
FROM employee;
```

- **Offset functions:** The offset functions provide a way of accessing data from another row in the same result set without joining the table to itself. They can answer questions concerning the value on the row before or after the current row, for example - `LEAD`, `LAG`.

```sql
SELECT department, salary,
LAG(salary) OVER (PARTITION BY department ORDER BY salary) as previous_salary,
LEAD(salary) OVER (PARTITION BY department ORDER BY salary) as next_salary
FROM employee;
```

In using window functions, the `OVER` clause defines the windows or group of rows for function to consider, `PARTITION BY` breaks up the window by a specific column(s), and `ORDER BY` orders rows within the window.

It's important to note that SQL window functions do not cause rows to become grouped into a single output row like aggregate methods do. Therefore, they do not reduce the number of rows returned by the query, each row maintains its individual identity.
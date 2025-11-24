Given a table `Salaries`,

| id | salary |
| -- | ------ |
| 1  | 1000   |
| 2  | 2000   |
| 3  | 3000   |
| 4  | 4000   |

The query to find the second-highest salary is shown in the code snippet below

```sql
SELECT DISTINCT Salary
FROM Salaries
ORDER BY Salary DESC
LIMIT 1 OFFSET 1
```

The result of the query is shown below

|   | salary |
| - | ------ |
| 1 | 3000   | 
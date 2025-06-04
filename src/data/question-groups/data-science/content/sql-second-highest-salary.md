To find the second highest salary, you can take one of two common methods: a subquery or a window function.

**Method 1: Subquery method**
You first get the maximum salary from the table. Then, you find the highest salary that's less than that max, giving you the second highest salary.

This method is clean and efficient:

```sql
SELECT MAX(salary) AS SecondHighest
FROM employee
WHERE salary < (SELECT MAX(salary) FROM employee);
```

**Method 2: Window function with DENSE_RANK()**
You rank all salaries in descending order using DENSE_RANK(), then filter for rank 2 to get the second highest. The LIMIT 1 ensures only one row is returned in case of ties. This method is better for flexibility if you want to choose the third highest or fourth, etc.

```sql
SELECT salary AS SecondHighest
FROM (
  SELECT salary, DENSE_RANK() OVER (ORDER BY salary DESC) as rank
  FROM employee
) ranked
WHERE rank = 2
LIMIT 1;
```

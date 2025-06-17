Given an `Employees` table with columns `id`, `name`, and `salary` that looks like this:

| id | name     | salary |
| -- | -------- | ------ |
| 1  | Irene    | 1000   |
| 2  | Peter    | 1230   |
| 3  | Raymond  | 1450   |
| 4  | Henry    | 1790   |
| 5  | Naomi    | 2350   |
| 6  | Bridget  | 2000   |
| 7  | Emily    | 2500   |
| 8  | Great    | 3000   |
| 9  | Mercedes | 2750   |
| 10 | Zoe      | 2900   |

The query to find employees earning more than the average salary is:

```sql
SELECT * FROM employees
WHERE salary > (SELECT AVG(salary) FROM employees);
```

| id | name     | salary |
| -- | -------- | ------ |
| 5  | Naomi    | 2350   |
| 7  | Emily    | 2500   |
| 8  | Great    | 3000   |
| 9  | Mercedes | 2750   |
| 10 | Zoe      | 2900   | 
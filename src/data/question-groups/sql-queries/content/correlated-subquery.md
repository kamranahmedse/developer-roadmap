A correlated subquery is a subquery that depends on a value from the outer query. This means that the query is evaluated for each row that might be selected in the outer query. Below is an example of a correlated subquery.

```sql
SELECT name, country_id, salary
FROM employees em
WHERE salary > (
  SELECT AVG(salary) FROM employees
  country_id = em.country_id);
```

The code above:

- Runs the outer query through each row of the table.
- Takes the `country_id` from the `employees` table.
- Iterates through the other rows and does the same calculation.

This leads to a degrading performance as the data in the table grows. 

You should use a correlated subquery if you want to perform row-specific operations or cannot achieve an operation using JOIN or other aggregate functions. 
A subquery is a query inside another query. It helps when you want to:

- Filter using aggregated data.
- Compare a value against a dynamic list.
- Create a temporary table for use in your main query.

Use cases include checking which employees work in a particular location or identifying orders above a calculated average.

```sql
-- Subquery in WHERE clause
SELECT name
FROM employees
WHERE department_id IN (
    SELECT id 
    FROM departments 
    WHERE location = 'New York'
);
``` 
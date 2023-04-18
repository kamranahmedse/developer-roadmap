# Grouping

Grouping is a powerful technique in SQL that allows you to organize and aggregate data based on common values in one or more columns. The `GROUP BY` clause is used to create groups, and the `HAVING` clause is used to filter the group based on certain conditions.

## GROUP BY Clause

The `GROUP BY` clause organizes the rows of the result into groups, with each group containing rows that have the same values for the specified column(s). It's often used with aggregate functions like `SUM()`, `COUNT()`, `AVG()`, `MIN()`, and `MAX()` to perform calculations on each group.

Here's a simple example to illustrate the concept:

```sql
SELECT department, COUNT(employee_id) AS employee_count
FROM employees
GROUP BY department;
```

This query will return the number of employees in each department. The result will be a new set of rows, with each row representing a department and the corresponding employee count.

## HAVING Clause

The `HAVING` clause is used to filter the grouped results based on a specified condition. Unlike the `WHERE` clause, which filters individual rows before the grouping, the `HAVING` clause filters groups after the aggregation.

Here's an example that uses the `HAVING` clause:

```sql
SELECT department, COUNT(employee_id) AS employee_count
FROM employees
GROUP BY department
HAVING employee_count > 5;
```

This query returns the departments that have more than 5 employees.

## Grouping with Multiple Columns

You can group by multiple columns to create more complex groupings. The following query calculates the total salary for each department and job title:

```sql
SELECT department, job_title, SUM(salary) AS total_salary
FROM employees
GROUP BY department, job_title;
```

The result will be a new set of rows, with each row representing a unique combination of department and job title, along with the total salary for that grouping.

## Summary

Grouping is a useful technique for organizing and aggregating data in SQL. The `GROUP BY` clause allows you to create groups of rows with common values in one or more columns, and then perform aggregate calculations on those groups. The `HAVING` clause can be used to filter the grouped results based on certain conditions.
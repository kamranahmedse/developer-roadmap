# Grouping

## Grouping in PostgreSQL

In this section, we will discuss the concept of grouping in PostgreSQL and how it can be utilized for data aggregation and analysis.

### Overview

Grouping is a powerful feature in SQL that allows you to aggregate and analyze data by grouping rows in a table based on specific columns. Using the `GROUP BY` clause, you can perform various aggregate functions such as sum, count, average, minimum, or maximum for each group of rows.

### Syntax

The basic syntax for using `GROUP BY` clause is as follows:

```sql
SELECT column1, column2, ... , aggregate_function(column)
FROM table_name
WHERE conditions
GROUP BY column1, column2, ...;
```

The `GROUP BY` clause appears after the `WHERE` clause and before the optional `HAVING` clause, which filters the results of the grouping.

### Examples

Let's take a look at some examples using the `GROUP BY` clause.

1. Count the number of employees in each department:

```sql
SELECT department, COUNT(*)
FROM employees
GROUP BY department;
```

2. Calculate the average salary for each job title:

```sql
SELECT job_title, AVG(salary)
FROM employees
GROUP BY job_title;
```

3. Find the total revenue for each product category:

```sql
SELECT category, SUM(revenue)
FROM sales
GROUP BY category;
```

### GROUP BY with HAVING

In some cases, you might want to filter the groups based on certain conditions. For this, you can use the `HAVING` clause. It is similar to the `WHERE` clause, but it filters the aggregated results rather than the individual rows.

Here's an example:

```sql
SELECT department, COUNT(*)
FROM employees
GROUP BY department
HAVING COUNT(*) > 10;
```

This query will display departments with more than 10 employees.

### Grouping Sets, Rollup, and Cube

PostgreSQL provides additional functions for more advanced grouping operations:

1. **Grouping Sets**: Generates multiple grouping sets within a single query.

```sql
SELECT department, job_title, COUNT(*)
FROM employees
GROUP BY GROUPING SETS ((department, job_title), (department), ());
```

2. **Rollup**: Generates multiple levels of aggregation from the most detailed to the total level.

```sql
SELECT department, job_title, COUNT(*)
FROM employees
GROUP BY ROLLUP (department, job_title);
```

3. **Cube**: Generates all possible combinations of grouped columns for more complex analysis.

```sql
SELECT department, job_title, COUNT(*)
FROM employees
GROUP BY CUBE (department, job_title);
```

### Conclusion

In this section, we have introduced the concept of grouping in PostgreSQL, which allows you to perform powerful data analysis and aggregation using the `GROUP BY` clause. We have also covered advanced grouping operations such as grouping sets, rollup, and cube. With these tools in your arsenal, you'll be able to efficiently analyze and extract meaningful insights from your data.
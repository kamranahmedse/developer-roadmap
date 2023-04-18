# Aggregate and window functions

## Aggregate and Window Functions

In this section, we will look at Aggregate and Window Functions, which are powerful tools frequently used when analyzing data in PostgreSQL. They allow you to perform calculations on data subsets and provide insight into the overall data.

### Aggregate Functions

Aggregate functions take multiple rows as input and return a single value by performing some operation (such as summation, averaging, or counting) on the whole data set or a specific subset. Some popular aggregate functions are:

- `COUNT()`: Returns the number of rows
- `SUM()`: Returns the sum of all the values in a column
- `AVG()`: Returns the average of all the values in a column
- `MAX()`: Returns the maximum value in a column
- `MIN()`: Returns the minimum value in a column

Here's an example that calculates the total and average salary of employees in a company:

```sql
SELECT COUNT(*) as number_of_employees,
       SUM(salary) as total_salary,
       AVG(salary) as average_salary
FROM employees;
```

### GROUP BY clause

Often while using aggregate functions, you might want to group results based on a particular column. The `GROUP BY` clause allows you to do this:

```sql
SELECT department, COUNT(*) as number_of_employees,
       SUM(salary) as total_salary,
       AVG(salary) as average_salary
FROM employees
GROUP BY department;
```

### HAVING clause

When you need to filter the result of an aggregate function based on a condition, you can use the `HAVING` clause. Note that the `HAVING` clause is applied after the `GROUP BY` clause:

```sql
SELECT department, COUNT(*) as number_of_employees,
       SUM(salary) as total_salary,
       AVG(salary) as average_salary
FROM employees
GROUP BY department
HAVING COUNT(*) > 10;
```

### Window Functions

Window functions are similar to aggregate functions, but instead of returning a single value for the entire data set, they return a value for each row, based on a calculated window of rows. Some popular window functions are:

- `ROW_NUMBER()`: Assigns a unique number to each row
- `RANK()`: Assigns a unique rank to each row, with the same rank for equal values
- `DENSE_RANK()`: Assigns a unique rank, but without gaps between the ranks
- `LEAD()`: Returns a value from a row that is "ahead" of the current row
- `LAG()`: Returns a value from a row that is "behind" the current row

Window functions are defined within an `OVER()` clause, which specifies the window (or range) of rows that should be used for the calculation. Here's an example that shows the total salary of a department for each employee:

```sql
SELECT department, salary,
       SUM(salary) OVER(PARTITION BY department) as total_salary
FROM employees;
```

This concludes our summary of Aggregate and Window Functions in PostgreSQL. These powerful techniques will help you perform complex calculations and analysis on your data. Remember to experiment and practice with various functions to gain a deeper understanding of their usage.
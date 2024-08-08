# MAX

The `MAX()` function in SQL is used to return the maximum value of an expression in a SELECT statement. 

It can be used for numeric, character, and datetime column data types. If there are null values, then they are not considered for comparison.

## Syntax

```sql
SELECT MAX(column_name)
FROM table_name
WHERE condition;
```

In this syntax, the `column_name` argument is the column in the `table_name` that you wish to find the maximum value of.

## Example

Consider the following Employee table:

| ID | NAME     | SALARY |
|----|----------|--------|
| 1  | John     | 1000   |
| 2  | Robert   | 2000   |
| 3  | Jim      | 3000   |
| 4  | Jessica  | 2500   |

To find the highest salary amongst all the employees, you would use the `MAX()` function as follows:

```sql
SELECT MAX(SALARY) AS "Highest Salary"
FROM Employee;
```

The above SQL returns `3000` as it’s the highest salary in the Employee table.

Warning: SQL `MAX()` function will only return a single row as a result. If multiple rows hold the highest value and if you want to get all these rows, you should not use `MAX()`. A better option would be sorting the column and then `LIMIT` the result just to the first row.
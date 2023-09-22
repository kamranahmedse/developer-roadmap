# Cross Join

The cross join in SQL is used to combine every row of the first table with every row of the second table. It's also known as the Cartesian product of the two tables. The most important aspect of performing a cross join is that it does not require any condition to join.

The issue with cross join is it returns the Cartesian product of the two tables, which can result in large numbers of rows and heavy resource usage. It's hence critical to use them wisely and only when necessary.

## Syntax

Here's the generic syntax for implementing a CROSS JOIN:

```sql
SELECT column_name(s)
FROM table1
CROSS JOIN table2;
```

You can alternatively use the below syntax to achieve the same result:

```sql
SELECT column_name(s)
FROM table1, table2;
```
Both syntax return the Cartesian product of `table1` and `table2`. 

## Example of CROSS JOIN

Let's consider two tables, `Employees` and `Departments`, where `Employees` has columns `EmpID, EmpName, DeptID` and `Departments` has columns `DeptID, DeptName`.

A cross join query would look like this:

```sql
SELECT Employees.EmpName, Departments.DeptName
FROM Employees 
CROSS JOIN Departments;
```

This statement will return a result set which is the combination of each row from `Employees` with each row from `Departments`.

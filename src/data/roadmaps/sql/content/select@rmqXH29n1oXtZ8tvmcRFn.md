# SELECT

The `SELECT` statement is used to retrieve data from one or more tables in a database. <br/>
It can be executed via a query like so:

```
SELECT column1, column2, ...
FROM table_name
WHERE condition
GROUP BY column
HAVING condition
ORDER BY column
LIMIT number;
```

 - Example:
```
SELECT name, department, salary
FROM employees
WHERE salary > 50000
ORDER BY salary DESC;
```

This query retrevies the _names_, _departments_, and _salaries_ of employees who earn more than $50,000, ordered by salary in descending order.

Visit the following resources to learn more:

- [@article@W#Schools SQL SELECT Statement Doc](https://www.w3schools.com/sql/sql_select.asp)

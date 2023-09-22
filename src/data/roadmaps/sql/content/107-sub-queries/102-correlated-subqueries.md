# Correlated Subqueries

In SQL, a correlated subquery is a subquery that uses values from the outer query in its WHERE clause. The correlated subquery is evaluated once for each row processed by the outer query. It exists because it depends on the outer query and it cannot execute independently of the outer query because the subquery is correlated with the outer query as it uses its column in its WHERE clause.

## Syntax:

```sql
SELECT column_name [, column_name...]
FROM   table1 [, table2...]
WHERE  column_name OPERATOR
  (SELECT column_name [, column_name...]
   FROM table_name
   WHERE condition [table1.column_name = table2.column_name...]);
```

## Code Example

For instance, if you want to get the employees whose salaries are above their department's average salaries, it can be queried with a correlated subquery as follows:

```sql
SELECT e1.employee_name, e1.salary
FROM employee e1
WHERE salary > 
   (SELECT AVG(salary)
   FROM employee e2
   WHERE e1.department = e2.department);
```

In the example above, the correlated subquery (the inner query) calculates the average salary for each department. The outer query then compares the salary of each employee to the average salary of their respective department. It returns the employees whose salaries are above their department's average. The correlated subquery is executed once for each row selected by the outer query. 

Also note that `e1` and `e2` are the aliases of the `employee` table so that we can use it in both the inner query and outer query. Here, `e2.department` in the inner query comes from the outer query's `e1.department`. 

Thus, a correlated subquery is a subquery that depends on the outer SQL query for its values. This means that the subquery is run once for every Row in the outer query, often resulting in quite a bit of processing, and thus slower results.
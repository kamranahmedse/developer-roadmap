# Lateral Join in PostgreSQL

In this section, we'll discuss a powerful feature in PostgreSQL called "Lateral Join". Lateral join allows you to reference columns from preceding tables in a query, making it possible to perform complex operations that involve correlated subqueries and the application of functions on tables in a cleaner and more effective way.

## Understanding Lateral Join

The `LATERAL` keyword in PostgreSQL is used in conjunction with a subquery in the `FROM` clause of a query. It helps you to write more concise and powerful queries, as it allows the subquery to reference columns from preceding tables in the query.

The main advantage of using the `LATERAL` keyword is that it enables you to refer to columns from a preceding table in a subquery that is part of the `FROM` clause when performing a join operation.

Here's a simple illustration of the lateral join syntax:

```sql
SELECT <column_list>
FROM <table1>,
LATERAL (<subquery>) AS <alias>
```

## When to Use Lateral Joins?

Using lateral joins becomes helpful when you have the following requirements:

- Need complex calculations done within subqueries that depend on values from earlier tables in the join list.
- Need to perform powerful filtering or transformations using a specific function.
- Dealing with hierarchical data and require results from a parent-child relationship.

## Example of Lateral Join

Consider the following example, where you have two tables: `employees` and `salaries`. We'll calculate the total salary by department and the average salary for each employee.

```sql
CREATE TABLE employees (
  id serial PRIMARY KEY,
  name varchar(100),
  department varchar(50)
);

CREATE TABLE salaries (
  id serial PRIMARY KEY,
  employee_id integer REFERENCES employees (id),
  salary numeric(10,2)
);

--Example data
INSERT INTO employees (name, department) VALUES 
('Alice', 'HR'),
('Bob', 'IT'),
('Charlie', 'IT'),
('David', 'HR');

INSERT INTO salaries (employee_id, salary) VALUES
(1, 1000),
(1, 1100),
(2, 2000),
(3, 3000),
(3, 3100),
(4, 4000);

--Using LATERAL JOIN
SELECT e.name, e.department, s.total_salary, s.avg_salary
FROM employees e
JOIN LATERAL (
  SELECT SUM(salary) as total_salary, AVG(salary) as avg_salary
  FROM salaries
  WHERE employee_id = e.id
) s ON TRUE;
```

In this example, we use lateral join to reference the `employee_id` column in the employees table while aggregating salaries in a subquery. The query returns the total and average salary for each employee by department.

So, in conclusion, lateral joins provide an efficient way to access values from preceding tables within a subquery, allowing for more clean and concise queries in PostgreSQL.
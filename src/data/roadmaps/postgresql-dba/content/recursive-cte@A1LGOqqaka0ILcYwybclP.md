# Recursive CTE (Common Table Expressions)

Recursive CTEs are a powerful feature in SQL that allow you to build complex hierarchical queries, retrieve data stored in hierarchical structures or even perform graph traversal. In simple terms, a recursive CTE is a CTE that refers to itself in its own definition, creating a loop that iterates through the data until a termination condition is met.

## Syntax

Here's the basic structure of a recursive CTE:

```sql
WITH RECURSIVE recursive_cte_name (column1, column2, ...) AS (
  -- Initial, non-recursive query (the "seed")
  SELECT ...
  
  UNION ALL  -- or UNION
  
  -- Recursive query (refers to the CTE)
  SELECT ...
  FROM recursive_cte_name
  WHERE ... -- Termination condition
)
SELECT ...
FROM recursive_cte_name;
```
## Example

Suppose we have a table called `employees` to represent an organization's hierarchy. Each row represents an employee with their `employee_id`, `employee_name`, and their `manager_id` (referring to the `employee_id` of their manager).

```sql
CREATE TABLE employees (
  employee_id INT PRIMARY KEY,
  employee_name VARCHAR(255),
  manager_id INT
);
```

Insert sample data:

```sql
INSERT INTO employees (employee_id, employee_name, manager_id)
VALUES (1, 'Alice', NULL),   -- CEO
       (2, 'Bob', 1),        -- Manager
       (3, 'Charlie', 2),    -- Employee
       (4, 'David', 2),      -- Employee
       (5, 'Eva', 3);        -- Employee
```

If we want to retrieve the entire organization hierarchy (i.e., chain of command from the CEO down to the individual employee), we can use a recursive CTE as follows:

```sql
WITH RECURSIVE org_hierarchy (employee_id, employee_name, level) AS (
  -- Initial query (find the CEO)
  SELECT employee_id, employee_name, 1
  FROM employees
  WHERE manager_id IS NULL
  
  UNION ALL
  
  -- Recursive query (find subordinates of the previously found employees)
  SELECT e.employee_id, e.employee_name, oh.level + 1
  FROM employees e
  JOIN org_hierarchy oh ON e.manager_id = oh.employee_id
)
SELECT *
FROM org_hierarchy
ORDER BY level, employee_id;
```

This query will return the following result:

```
employee_id | employee_name | level
------------+---------------+-------
         1  | Alice         |  1
         2  | Bob           |  2
         3  | Charlie       |  3
         4  | David         |  3
         5  | Eva           |  4
```

In the example above, our recursive CTE iterates through the organization hierarchy, following the chain of command from the CEO to each employee at different levels, and yields the result as a single flat table.

Note that recursive CTEs can be complex, and it's important to ensure a proper termination condition to avoid infinite recursion. Also, be careful with the use of `UNION ALL` or `UNION`, as it may impact the results and the performance of your query.
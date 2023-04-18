# Recursive CTE

# Recursive CTEs (Common Table Expressions)

Recursive CTEs are powerful and versatile SQL constructs that allow complex hierarchical or recursive queries to be simplified and represented as a single, self-referencing query. A Recursive CTE is defined by a base (anchor) part and a recursive part, which are working together to form the complete query result.

## Components of a Recursive CTE

A recursive CTE consists of two main components:

1. **Anchor Part**: This part of the CTE provides the initial data and establishes the base case for the recursion. 

2. **Recursive Part**: This part of the CTE defines the recursive operation that will be applied to the data, referencing the CTE itself.

The anchor and recursive parts must have the same number of columns and compatible data types.

## Syntax

Here's the general syntax for a recursive CTE:

```sql
WITH RECURSIVE cte_name (column_names) AS (
    -- Anchor Part
    SELECT ...
    FROM ...
    WHERE ...
    UNION ALL
    -- Recursive Part
    SELECT ...
    FROM ...
    JOIN cte_name ON ...
    WHERE ...
)
SELECT * FROM cte_name;
```

## Example Usage

Let's say we have a table named 'employees' with columns 'id', 'name', and 'manager_id', where 'manager_id' represents the manager of each employee. We want to retrieve the entire hierarchy of employees and their managers.

```sql
WITH RECURSIVE employee_hierarchy (id, name, manager_id, level) AS (
    -- Anchor Part
    SELECT id, name, manager_id, 1 as level
    FROM employees
    WHERE manager_id IS NULL
    UNION ALL
    -- Recursive Part
    SELECT e.id, e.name, e.manager_id, eh.level + 1
    FROM employees e
    JOIN employee_hierarchy eh ON e.manager_id = eh.id
)
SELECT * FROM employee_hierarchy
ORDER BY level, id;
```

In this example, the anchor part of the recursive CTE finds the top-level employees (those without a manager) and sets their hierarchy level to 1. The recursive part then iteratively finds and includes employees and their managers by joining the employees with the current result set of the CTE based on the managers' IDs, incrementing the hierarchy level each time.

## Summary

Recursive CTEs are an advanced SQL feature that enables hierarchical or recursive queries to be adapted and processed in a single, self-referencing construct. By understanding and effectively utilizing recursive CTEs, you can write more efficient and cleaner SQL queries for complex data structures and relationships.
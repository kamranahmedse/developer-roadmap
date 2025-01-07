---
title: Recursive CTEs
description: Learn how to use recursive CTEs to query hierarchical data structures
order: 130
type: lesson-challenge
setup: |
  ```sql
  CREATE TABLE employee (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255),
      manager_id INT
  );

  INSERT INTO employee (id, name, manager_id) VALUES
      (1, 'Sarah Johnson', NULL),
      (2, 'Emily Brown', 1),
      (3, 'Mike Wilson', 1),
      (4, 'Lisa Miller', 2),
      (5, 'Tom Davis', 2),
      (6, 'Anna Lee', 3),
      (7, 'James Wilson', 3),
      (8, 'Peter Chen', 4);

  CREATE TABLE category (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255),
      parent_id INT
  );

  INSERT INTO category (id, name, parent_id) VALUES
      (1, 'Books', NULL),
      (2, 'Fiction', 1),
      (3, 'Science Fiction', 2),
      (4, 'Space Opera', 3),
      (5, 'Hard SF', 3),
      (6, 'Fantasy', 2),
      (7, 'Non-Fiction', 1);

  CREATE TABLE book (
      id SERIAL PRIMARY KEY,
      title VARCHAR(255),
      category_id INT
  );

  INSERT INTO book (id, title, category_id) VALUES
      (1, 'The Great Gatsby', 2),
      (2, '1984', 2),
      (3, 'The Catcher in the Rye', 2),
      (4, 'The Lord of the Rings', 6),
      (5, 'The Hobbit', 6),
      (6, 'The Picture of Dorian Gray', 6),
      (7, 'The Picture of Dorian Gray', 6);
  ```
---

In our previous lesson, we learned about Common Table Expressions (CTEs) and how they can help us write more readable and maintainable queries. In this lesson, we will learn about recursive CTEs, which are particularly useful when working with hierarchical or tree-structured data.

## What is a Recursive CTE?

A recursive CTE is a CTE that references itself. Think of it as a way to repeatedly process data until a condition is met. It's particularly useful when dealing with:

- Organizational hierarchies (employee → manager relationships)
- Category trees (parent → child categories)
- Network paths (points connected to other points)

The basic syntax for a recursive CTE is:

```sql
WITH RECURSIVE cte_name AS (
    -- Base case (non-recursive part)
    SELECT ...

    UNION ALL

    -- Recursive part
    SELECT ...
    FROM cte_name -- notice the self-reference
    WHERE ...
)
SELECT * FROM cte_name;
```

Let's start with a simple example to understand this better.

## Example: Generating Numbers

Before we dive into hierarchical data, let's see how recursive CTEs work with a simple example - generating a sequence of numbers:

```sql
WITH RECURSIVE numbers AS (
    -- Base case: Start with 1
    SELECT 1 as n

    UNION ALL

    -- Recursive case: Add 1 to previous number
    SELECT n + 1
    FROM numbers
    WHERE n < 5 -- stop condition
)
SELECT * FROM numbers;
```

This query will generate:

| n   |
| --- |
| 1   |
| 2   |
| 3   |
| 4   |
| 5   |

Let's break down how this works:

1. Base case returns 1
2. Recursive case adds 1 to previous number
3. Process continues until n = 5 (stop condition)
4. Finally, all numbers are combined using UNION ALL

## Example:Generating Dates

We can use recursive CTEs with any sequential data. Here's an example of how you can generate a sequence of dates:

```sql
WITH RECURSIVE dates AS (
    -- Base case: Start with start of month
    SELECT CAST('2025-02-01' AS DATE) as month_day

    UNION ALL

    -- Recursive case: Add one day to previous date
    SELECT month_day + 1
    FROM dates
    WHERE month_day < DATE '2025-02-10' -- stop condition
)
SELECT * FROM dates;
```

The output from this query will be:

| month_day  |
| ---------- |
| 2025-02-01 |
| 2025-02-02 |
| 2025-02-03 |
| 2025-02-04 |
| 2025-02-05 |
| 2025-02-06 |
| 2025-02-07 |
| 2025-02-08 |
| 2025-02-09 |
| 2025-02-10 |

This could be useful for generating reports where you need some data for each day of the month, for example.

## Working with Hierarchical Data

Now let's look at more practical examples using the employee and book category tables from our setup.

### Example: Employee Hierarchy

Given the following table structure:

| employee      | manager_id |
| ------------- | ---------- |
| Sarah Johnson | NULL       |
| Emily Brown   | 1          |
| Mike Wilson   | 1          |
| Lisa Miller   | 2          |
| Tom Davis     | 2          |
| Anna Lee      | 3          |
| James Wilson  | 3          |
| Peter Chen    | 4          |

Let's start with a simple query to print the depth (i.e. how many managers are between the employee and the CEO) of each employee:

```sql
WITH RECURSIVE emp_hierarchy AS (
    -- Base case: Start with CEO (manager_id is NULL)
    SELECT id, name, manager_id, 1 as depth
    FROM employee
    WHERE manager_id IS NULL

    UNION ALL

    -- Recursive case: Join with employees table
    SELECT e.id, e.name, e.manager_id, h.depth + 1
    FROM employee e
    INNER JOIN emp_hierarchy h ON e.manager_id = h.id
)
SELECT
    name as employee,
    depth
FROM emp_hierarchy
ORDER BY depth, name;
```

This query will show the organizational hierarchy:

| employee      | depth |
| ------------- | ----- |
| Sarah Johnson | 1     |
| Emily Brown   | 2     |
| Mike Wilson   | 2     |
| Lisa Miller   | 3     |
| Tom Davis     | 3     |
| Anna Lee      | 4     |
| James Wilson  | 4     |
| Peter Chen    | 4     |

### Example: Finding Management Chain

Let's take the previous query and find the management chain for each employee. We can write the query as follows:

```sql
WITH RECURSIVE management_chain AS (
    -- Base case: Start with specific employee
    SELECT
        id,
        name,
        manager_id,
        name AS chain
    FROM employee
    WHERE manager_id IS NULL

    UNION ALL

    -- Recursive case: Join with managers
    SELECT
        e.id,
        e.name,
        e.manager_id,
        CAST(CONCAT(m.chain, ' -> ', e.name) AS VARCHAR(255))
    FROM
        employee e
    INNER JOIN
        management_chain m ON e.manager_id = m.id
)
SELECT chain AS management_chain
FROM management_chain
ORDER BY LENGTH(chain) ASC;
```

This will show the following output:

| management_chain                                          |
| --------------------------------------------------------- |
| Sarah Johnson                                             |
| Sarah Johnson -> Emily Brown                              |
| Sarah Johnson -> Mike Wilson                              |
| Sarah Johnson -> Mike Wilson -> Anna Lee                  |
| Sarah Johnson -> Emily Brown -> Tom Davis                 |
| Sarah Johnson -> Emily Brown -> Lisa Miller               |
| Sarah Johnson -> Mike Wilson -> James Wilson              |
| Sarah Johnson -> Emily Brown -> Lisa Miller -> Peter Chen |

The way we are preparing the chain is as follows:

- Base case just has the `name as chain` because we are starting with the CEO i.e. `manager_id` is `NULL`
- Recursive case, when joins with `management_chain`, keeps concatenating the `name` of the employee with the `chain` of the manager.
- Lastly, we are sorting the output by the length of the chain.

### Example: Book Categories

Given the following table structure:

| id  | name            | parent_id |
| --- | --------------- | --------- |
| 1   | Books           | NULL      |
| 2   | Fiction         | 1         |
| 3   | Science Fiction | 2         |
| 4   | Space Opera     | 3         |
| 5   | Hard SF         | 3         |
| 6   | Fantasy         | 2         |
| 7   | Non-Fiction     | 1         |

Let's write a query to show all subcategories for each category:

```sql
WITH RECURSIVE category_tree AS (
    -- Base case: Start with root categories
    SELECT
        id,
        name,
        parent_id,
        1 as level,
        name as path
    FROM category
    WHERE parent_id IS NULL

    UNION ALL

    -- Recursive case: Join with child categories
    SELECT
        c.id,
        c.name,
        c.parent_id,
        t.level + 1,
        CAST(CONCAT(t.path, ' > ', c.name) AS VARCHAR(255)) as path
    FROM category c
    INNER JOIN category_tree t ON t.id = c.parent_id
)
SELECT
    name as category,
    path as full_path
FROM category_tree
ORDER BY path;
```

The output from this query will be:

| category        | full_path                                       |
| --------------- | ----------------------------------------------- |
| Books           | Books                                           |
| Fiction         | Books > Fiction                                 |
| Fantasy         | Books > Fiction > Fantasy                       |
| Science Fiction | Books > Fiction > Science Fiction               |
| Hard SF         | Books > Fiction > Science Fiction > Hard SF     |
| Space Opera     | Books > Fiction > Science Fiction > Space Opera |
| Non-Fiction     | Books > Non-Fiction                             |

## Best Practices

When working with recursive CTEs:

- **Always Include a Termination Condition**: Use a `WHERE` clause or similar to prevent infinite recursion
- **Keep it Simple**: Start with the simplest version that works, then add complexity
- **Test with Small Data Sets**: Recursive queries can be resource-intensive
- **Consider Performance**: For very large hierarchies, consider alternative solutions if possible.

In our next chapter, we will learn about window functions and how they can help us perform calculations across rows.

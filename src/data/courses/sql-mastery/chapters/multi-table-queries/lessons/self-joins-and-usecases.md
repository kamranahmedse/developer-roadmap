---
title: Self Joins and Use Cases
description: Learn how to use self joins to query hierarchical and self-referential data
order: 130
type: lesson-challenge
setup: |
  ```sql
  CREATE TABLE employee (
      id INT PRIMARY KEY,
      name VARCHAR(255),
      manager_id INT
  );

  INSERT INTO employee (id, name, manager_id)
  VALUES (1, 'John Smith', NULL),     -- CEO
         (2, 'Sarah Johnson', 1),      -- Reports to John
         (3, 'Michael Brown', 1),      -- Reports to John
         (4, 'Emily Davis', 2),        -- Reports to Sarah
         (5, 'James Wilson', 2),       -- Reports to Sarah
         (6, 'Lisa Anderson', 3);      -- Reports to Michael

  CREATE TABLE product (
      id INT PRIMARY KEY,
      name VARCHAR(255),
      substitute_product_id INT
  );

  INSERT INTO product (id, name, substitute_product_id)
  VALUES (1, 'iPhone 13', 2),
         (2, 'iPhone 14', 3),
         (3, 'iPhone 15', NULL),
         (4, 'Galaxy S21', 5),
         (5, 'Galaxy S22', 6),
         (6, 'Galaxy S23', NULL);
  ```
---

Sometimes, you may need to join a table with itself. This might sound strange at first, but it's a powerful technique for working with hierarchical or self-referential data.

## What is a Self Join?

A self join is when you join a table to itself. This is useful when a table contains records that reference other records in the same table i.e. hierarchical data. Common examples include:

- Employee-manager relationships
- Product substitutes (e.g. a product may have a substitute)
- Family trees (e.g. a person having parent and children)
- Organization hierarchies

Let's understand this with some examples. Let's say that we have the following `employee` table where each employee has a `manager_id` that references the `id` of another employee:

| id  | name          | manager_id |
| --- | ------------- | ---------- |
| 1   | John Smith    | NULL       |
| 2   | Sarah Johnson | 1          |
| 3   | Michael Brown | 1          |
| 4   | Emily Davis   | 2          |
| 5   | James Wilson  | 2          |
| 6   | Lisa Anderson | 3          |

Each employee (except John, the CEO) has a manager, who is also an employee. Let's write some queries to understand self joins.

### Finding Employees and Their Managers

The query below will return employees and their managers:

```sql
SELECT
    e.name AS employee,
    m.name AS manager
FROM employee e
LEFT JOIN employee m ON e.manager_id = m.id;
```

Notice that we are using aliases (`e` and `m`) to distinguish between the two instances of the same table. Also, we are using `LEFT JOIN` to ensure that we include all employees, even those without a manager (i.e. John who has no manager).

The output of the query will be:

| employee      | manager       |
| ------------- | ------------- |
| John Smith    | NULL          |
| Sarah Johnson | John Smith    |
| Michael Brown | John Smith    |
| Emily Davis   | Sarah Johnson |
| James Wilson  | Sarah Johnson |
| Lisa Anderson | Michael Brown |

### Finding Employees who Report to Sarah

We can use a self join to find employees who report to Sarah:

```sql
SELECT
    e.name AS employee,
    m.name AS manager
FROM employee e
LEFT JOIN employee m ON e.manager_id = m.id
WHERE m.name = 'Sarah';
```

The output of the query will be:

| employee     | manager       |
| ------------ | ------------- |
| Emily Davis  | Sarah Johnson |
| James Wilson | Sarah Johnson |

That's all for this lesson. Make sure to practice the examples and try out different types of self joins. Future lessons will cover more examples and use cases for self joins. Let's move on to the next lesson where we will learn about foreign keys.

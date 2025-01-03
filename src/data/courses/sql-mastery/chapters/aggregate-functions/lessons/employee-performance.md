---
title: Employee Performance
description: Practice using self joins with aggregate functions
order: 110
type: challenge
setup: |
  ```sql
  CREATE TABLE employee (
      id INT PRIMARY KEY,
      name VARCHAR(255),
      manager_id INT,
      hire_date DATE
  );

  CREATE TABLE sale (
      id INT PRIMARY KEY,
      employee_id INT,
      sale_date DATE,
      amount DECIMAL(10,2)
  );

  INSERT INTO employee (id, name, manager_id, hire_date) VALUES
      (1, 'Sarah Johnson', NULL, '2023-01-15'),    -- Store Manager
      (2, 'Mike Wilson', 1, '2023-02-01'),         -- Reports to Sarah
      (3, 'Emily Brown', 1, '2023-02-15'),         -- Reports to Sarah
      (4, 'Tom Davis', 2, '2023-03-01'),           -- Reports to Mike
      (5, 'Lisa Miller', 2, '2023-03-15'),         -- Reports to Mike
      (6, 'James Wilson', 3, '2023-04-01');        -- Reports to Emily

  INSERT INTO sale (id, employee_id, sale_date, amount) VALUES
      (1, 2, '2024-02-01', 150.00),
      (2, 2, '2024-02-02', 200.00),
      (3, 3, '2024-02-01', 300.00),
      (4, 4, '2024-02-02', 250.00),
      (5, 4, '2024-02-03', 175.00),
      (6, 5, '2024-02-01', 225.00),
      (7, 5, '2024-02-02', 125.00),
      (8, 6, '2024-02-03', 350.00);
  ```
---

The bookstore wants to analyze the sales performance of their employees and their teams. They need a report showing how each manager's team is performing.

Given the following data in table `employee`:

| id  | name           | manager_id | hire_date  |
| --- | -------------- | ---------- | ---------- |
| 1   | Sarah Johnson  | NULL       | 2023-01-15 |
| 2   | Mike Wilson    | 1          | 2023-02-01 |
| 3   | Emily Brown    | 1          | 2023-02-15 |
| 4   | Tom Davis      | 2          | 2023-03-01 |
| 5   | Lisa Miller    | 2          | 2023-03-15 |
| 6   | James Wilson   | 3          | 2023-04-01 |

And the following data in table `sale`:

| id  | employee_id | sale_date  | amount |
| --- | ----------- | ---------- | ------ |
| 1   | 2           | 2024-02-01 | 150.00 |
| 2   | 2           | 2024-02-02 | 200.00 |
| 3   | 3           | 2024-02-01 | 300.00 |
| 4   | 4           | 2024-02-02 | 250.00 |
| 5   | 4           | 2024-02-03 | 175.00 |
| 6   | 5           | 2024-02-01 | 225.00 |
| 7   | 5           | 2024-02-02 | 125.00 |
| 8   | 6           | 2024-02-03 | 350.00 |

Write a query that shows for each manager:
- Manager name
- Number of employees they manage
- Total sales by their team (including the manager's direct sales)
- Average sale amount per team member

Only include managers who have at least one employee reporting to them, and order the results by total team sales in descending order.

## Expected Output

| manager_name   | team_size | total_team_sales | avg_sale_per_member |
| -------------- | --------- | ---------------- | ------------------ |
| Sarah Johnson  | 5          | 1775.00          | 355.00             |
| Mike Wilson    | 2          | 775.00           | 387.50             |
| Emily Brown    | 1          | 350.00           | 350.00             |

## Solution

```sql
SELECT 
    m.name as manager_name,
    COUNT(DISTINCT e.id) as team_size,
    SUM(s.amount) as total_team_sales,
    SUM(s.amount) / COUNT(DISTINCT e.id) as avg_sale_per_member
FROM employee m
INNER JOIN employee e ON e.manager_id = m.id
INNER JOIN sale s ON s.employee_id = e.id
GROUP BY m.id, m.name
ORDER BY total_team_sales DESC;
```

### Explanation

Let's break down how this query works:

First, we use a self-join to connect managers with their employees:
```sql
FROM employee m
INNER JOIN employee e ON e.manager_id = m.id
```

Then we join with the sales table to get sales data:
```sql
INNER JOIN sale s ON s.employee_id = e.id
```

We calculate various metrics for each manager:
```sql
COUNT(DISTINCT e.id) -- Counts number of team members
SUM(s.amount) -- Sums up all sales by the team
SUM(s.amount) / COUNT(DISTINCT e.id) -- Calculates average sales per team member
```

We group by manager and order by total sales:
```sql
GROUP BY m.id, m.name
ORDER BY total_team_sales DESC
```
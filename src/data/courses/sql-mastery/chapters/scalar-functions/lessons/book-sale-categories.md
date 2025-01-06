---
title: Book Categories
description: Practice using CASE expressions to categorize books and inventory levels
order: 220
type: challenge
setup: |
  ```sql
  CREATE TABLE book (
      id INT PRIMARY KEY,
      title VARCHAR(100),
      page_count INT,
      publish_year INT,
      copies_in_stock INT,
      monthly_rentals INT
  );

  INSERT INTO book (id, title, page_count, publish_year, copies_in_stock, monthly_rentals) VALUES
      (1, 'SQL Basics', 250, 2020, 5, 12),
      (2, 'Advanced Queries', 450, 2021, 3, 8),
      (3, 'Database Design', 350, 2019, 10, 15),
      (4, 'Query Optimization', 275, 2022, 2, 6),
      (5, 'Data Modeling', 400, 2021, 1, 4),
      (6, 'PostgreSQL Tips', 200, 2023, 8, 20);
  ```
---

The bookstore manager wants to analyze the SQL book collection. They want a report that categorizes books based on various criteria.

Given the following data in table `book`:

| title              | page_count | copies_in_stock | monthly_rentals |
| ------------------ | ---------- | --------------- | --------------- |
| SQL Basics         | 250        | 5               | 12              |
| Advanced Queries   | 450        | 3               | 8               |
| Database Design    | 350        | 10              | 15              |
| Query Optimization | 275        | 2               | 6               |
| Data Modeling      | 400        | 1               | 4               |
| PostgreSQL Tips    | 200        | 8               | 20              |

Write a query that shows:

- Book title
- Book length category:
  - `Short` if page_count < 300
  - `Medium` if page_count between 300 and 400
  - `Long` if page_count > 400
- Stock status:
  - `Low` if copies_in_stock < 3
  - `Medium` if copies_in_stock between 3 and 7
  - `High` if copies_in_stock > 7
- Popularity:
  - `High Demand` if monthly_rentals > 12
  - `Medium Demand` if monthly_rentals between 6 and 12
  - `Low Demand` if monthly_rentals < 6

## Expected Output

| title              | length_category | stock_status | popularity    |
| ------------------ | --------------- | ------------ | ------------- |
| PostgreSQL Tips    | Short           | High         | High Demand   |
| Database Design    | Medium          | High         | High Demand   |
| SQL Basics         | Short           | Medium       | Medium Demand |
| Advanced Queries   | Long            | Medium       | Medium Demand |
| Query Optimization | Short           | Low          | Medium Demand |
| Data Modeling      | Medium          | Low          | Low Demand    |

## Solution

```sql
SELECT
    title,
    CASE
        WHEN page_count < 300 THEN 'Short'
        WHEN page_count <= 400 THEN 'Medium'
        ELSE 'Long'
    END as length_category,
    CASE
        WHEN copies_in_stock < 3 THEN 'Low'
        WHEN copies_in_stock <= 7 THEN 'Medium'
        ELSE 'High'
    END as stock_status,
    CASE
        WHEN monthly_rentals > 12 THEN 'High Demand'
        WHEN monthly_rentals >= 6 THEN 'Medium Demand'
        ELSE 'Low Demand'
    END as popularity
FROM book
ORDER BY monthly_rentals DESC;
```

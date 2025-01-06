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

A library needs to analyze their SQL book collection. They want a report that categorizes books based on various criteria.

Given the following data in table `book`:

| id  | title              | page_count | publish_year | copies_in_stock | monthly_rentals |
| --- | ------------------ | ---------- | ------------ | --------------- | --------------- |
| 1   | SQL Basics         | 250        | 2020         | 5               | 12              |
| 2   | Advanced Queries   | 450        | 2021         | 3               | 8               |
| 3   | Database Design    | 350        | 2019         | 10              | 15              |
| 4   | Query Optimization | 275        | 2022         | 2               | 6               |
| 5   | Data Modeling      | 400        | 2021         | 1               | 4               |
| 6   | PostgreSQL Tips    | 200        | 2023         | 8               | 20              |

Write a query that shows:

- Book title
- Book length category:
  - `Short` if page_count < 300
  - `Medium` if page_count between 300 and 400
  - `Long` if page_count > 400
- Publication status:
  - `Recent` if publish_year >= 2022
  - `Current` if publish_year is 2020 or 2021
  - `Older` if publish_year < 2020
- Stock status:
  - `Low` if copies_in_stock < 3
  - `Medium` if copies_in_stock between 3 and 7
  - `High` if copies_in_stock > 7
- Popularity:
  - `High Demand` if monthly_rentals > 12
  - `Medium Demand` if monthly_rentals between 6 and 12
  - `Low Demand` if monthly_rentals < 6

## Expected Output

| title              | length_category | publication_status | stock_status | popularity    |
| ------------------ | --------------- | ------------------ | ------------ | ------------- |
| PostgreSQL Tips    | Short           | Recent             | High         | High Demand   |
| Database Design    | Medium          | Older              | High         | High Demand   |
| SQL Basics         | Short           | Current            | Medium       | Medium Demand |
| Advanced Queries   | Long            | Current            | Medium       | Medium Demand |
| Query Optimization | Short           | Recent             | Low          | Medium Demand |

Data Modeling Medium Current Low Low Demand

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
        WHEN publish_year >= 2022 THEN 'Recent'
        WHEN publish_year >= 2020 THEN 'Current'
        ELSE 'Older'
    END as publication_status,
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
FROM books
ORDER BY monthly_rentals DESC;
```

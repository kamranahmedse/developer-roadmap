---
title: Book Performance
description: Practice using CASE expressions and GROUP BY for book analysis
order: 220
type: challenge
setup: |
  ```sql
  CREATE TABLE book (
      id INT PRIMARY KEY,
      title VARCHAR(100),
      category VARCHAR(50),
      rating DECIMAL(3,1),
      published_year INT,
      total_reviews INT
  );

  INSERT INTO book (id, title, category, rating, published_year, total_reviews) VALUES
      (1, 'SQL Basics', 'Programming', 4.5, 2020, 120),
      (2, 'Advanced Queries', 'Programming', 4.8, 2021, 85),
      (3, 'Database Design', 'Database', 4.2, 2019, 150),
      (4, 'Query Optimization', 'Database', 4.6, 2022, 65),
      (5, 'Data Modeling', 'Database', 2.9, 2021, 45),
      (6, 'PostgreSQL Tips', 'Programming', 4.7, 2023, 95),
      (7, 'NoSQL Concepts', 'Database', 4.3, 2022, 75),
      (8, 'SQL for Beginners', 'Programming', 4.4, 2020, 200);
  ```
---

The book store wants to analyze their book sales. They need a report that shows book performance by category and rating.

Given the following data in table `book`:

| id  | title              | category    | rating | total_reviews |
| --- | ------------------ | ----------- | ------ | ------------- |
| 1   | SQL Basics         | Programming | 4.5    | 120           |
| 2   | Advanced Queries   | Programming | 4.8    | 85            |
| 3   | Database Design    | Database    | 4.2    | 150           |
| 4   | Query Optimization | Database    | 4.6    | 65            |
| 5   | Data Modeling      | Database    | 2.9    | 45            |
| 6   | PostgreSQL Tips    | Programming | 4.7    | 95            |
| 7   | NoSQL Concepts     | Database    | 4.3    | 75            |
| 8   | SQL for Beginners  | Programming | 4.4    | 200           |

Write a query that shows:

- Category
- Rating group:
  - `Outstanding` if rating >= 4.5
  - `Good` if rating >= 4.0
  - `Average` if rating >= 3.5
  - `Poor` if rating >= 3.0
- Number of books in each group

## Expected Output

| category    | rating_group | book_count |
| ----------- | ------------ | ---------- |
| Database    | Poor         | 1          |
| Database    | Outstanding  | 1          |
| Database    | Good         | 2          |
| Programming | Outstanding  | 3          |
| Programming | Good         | 1          |

## Solution

```sql
SELECT
    category,
    CASE
        WHEN rating >= 4.5 THEN 'Outstanding'
        WHEN rating >= 4.0 THEN 'Good'
        WHEN rating >= 3.5 THEN 'Average'
        ELSE 'Poor'
    END as rating_group,
    COUNT(*) as book_count
FROM book
GROUP BY
    category,
    CASE
        WHEN rating >= 4.5 THEN 'Outstanding'
        WHEN rating >= 4.0 THEN 'Good'
        WHEN rating >= 3.5 THEN 'Average'
        ELSE 'Poor'
    END
ORDER BY category, rating_group DESC;
```

---
title: Low Stock by Category
description: Practice using correlated subqueries to find books with low stock in each category
order: 142
type: challenge
setup: |
  ```sql
  CREATE TABLE book (
      id INT PRIMARY KEY,
      title VARCHAR(100),
      category VARCHAR(50),
      price DECIMAL(10,2),
      stock INT
  );

  INSERT INTO book (id, title, category, price, stock) VALUES
      (1, 'SQL Basics', 'Programming', 29.99, 10),
      (2, 'Advanced SQL', 'Programming', 49.99, 5),
      (3, 'Data Science', 'Data Analysis', 39.99, 8),
      (4, 'Web Development', 'Programming', 34.99, 3),
      (5, 'Statistics 101', 'Data Analysis', 24.99, 15),
      (6, 'Machine Learning', 'Data Analysis', 44.99, 6),
      (7, 'Python Basics', 'Programming', 29.99, 12),
      (8, 'R Programming', 'Data Analysis', 34.99, 4);
  ```
---

The bookstore manager wants to identify books that have lower stock than the average stock level in their respective categories. This will help in planning reorders.

Given the following data in table `book`:

| id | title           | category      | price | stock |
| -- | --------------- | ------------- | ----- | ----- |
| 1  | SQL Basics      | Programming   | 29.99 | 10    |
| 2  | Advanced SQL    | Programming   | 49.99 | 5     |
| 3  | Data Science    | Data Analysis | 39.99 | 8     |
| 4  | Web Development | Programming   | 34.99 | 3     |
| 5  | Statistics 101  | Data Analysis | 24.99 | 15    |
| 6  | Machine Learning| Data Analysis | 44.99 | 6     |
| 7  | Python Basics   | Programming   | 29.99 | 12    |
| 8  | R Programming   | Data Analysis | 34.99 | 4     |

Write a query that shows books with stock levels below their category average. Show:

- Book title
- Category
- Current stock
- Category average stock (rounded to 1 decimal place)

## Expected Output

| title           | category      | stock | category_avg |
| --------------- | ------------- | ----- | ------------ |
| Advanced SQL    | Programming   | 5     | 7.5         |
| Web Development | Programming   | 3     | 7.5         |
| R Programming   | Data Analysis | 4     | 8.3         |
| Machine Learning| Data Analysis | 6     | 8.3         |

> **Note:** The query must use a correlated subquery to calculate the category average.

## Solution

```sql
SELECT 
    b1.title,
    b1.category,
    b1.stock,
    ROUND((
        SELECT AVG(stock)
        FROM book b2
        WHERE b2.category = b1.category
    ), 1) as category_avg
FROM book b1
WHERE b1.stock < (
    SELECT AVG(stock)
    FROM book b2
    WHERE b2.category = b1.category
)
ORDER BY b1.category, b1.stock;
```

This challenge requires you to:
1. Use a correlated subquery to calculate the average stock for each category
2. Compare each book's stock to its category average
3. Show only books with below-average stock

The solution demonstrates:
- Using correlated subqueries in both SELECT and WHERE clauses
- Comparing individual values against group averages
- Working with a single table

---
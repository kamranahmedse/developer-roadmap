---
title: Latest Category Books
description: Practice using correlated subqueries to find the most recent books in each category
order: 141
type: challenge
setup: |
  ```sql
  CREATE TABLE book (
      id INT PRIMARY KEY,
      title VARCHAR(100),
      category VARCHAR(50),
      published_date DATE,
      price DECIMAL(10,2)
  );

  INSERT INTO book (id, title, category, published_date, price) VALUES
      (1, 'SQL Basics', 'Programming', '2023-06-15', 29.99),
      (2, 'Advanced SQL', 'Programming', '2024-01-20', 49.99),
      (3, 'Data Science', 'Data Analysis', '2023-12-10', 39.99),
      (4, 'Web Development', 'Programming', '2023-09-01', 34.99),
      (5, 'Statistics 101', 'Data Analysis', '2024-02-15', 24.99),
      (6, 'Machine Learning', 'Data Analysis', '2023-11-15', 44.99),
      (7, 'Python Basics', 'Programming', '2024-02-01', 29.99),
      (8, 'R Programming', 'Data Analysis', '2024-01-05', 34.99);
  ```
---

The bookstore wants to highlight the most recently published book in each category. This will help them promote their newest offerings to customers.

Given the following data in table `book`:

| id  | title           | category      | published_date | price |
| --- | --------------- | ------------- | -------------- | ----- |
| 1   | SQL Basics      | Programming   | 2023-06-15    | 29.99 |
| 2   | Advanced SQL    | Programming   | 2024-01-20    | 49.99 |
| 3   | Data Science    | Data Analysis | 2023-12-10    | 39.99 |
| 4   | Web Development | Programming   | 2023-09-01    | 34.99 |
| 5   | Statistics 101  | Data Analysis | 2024-02-15    | 24.99 |
| 6   | Machine Learning| Data Analysis | 2023-11-15    | 44.99 |
| 7   | Python Basics   | Programming   | 2024-02-01    | 29.99 |
| 8   | R Programming   | Data Analysis | 2024-01-05    | 34.99 |

Write a query that finds the most recently published book in each category. The query should show:

- Category
- Book title
- Published date
- Price

## Expected Output

| category      | title          | published_date | price |
| ------------- | -------------- | -------------- | ----- |
| Data Analysis | Statistics 101 | 2024-02-15    | 24.99 |
| Programming   | Python Basics  | 2024-02-01    | 29.99 |

## Solution

```sql
SELECT 
    b1.category,
    b1.title,
    b1.published_date,
    b1.price
FROM book b1
WHERE b1.published_date = (
    SELECT MAX(published_date)
    FROM book b2
    WHERE b2.category = b1.category
)
ORDER BY b1.category;
``` 
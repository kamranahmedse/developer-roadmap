---
title: Price Range Analysis
description: Practice using RANGE in window frames to analyze similar-priced books
order: 180
type: challenge
setup: |
  ```sql
  CREATE TABLE book (
      id INT PRIMARY KEY,
      title VARCHAR(100),
      category VARCHAR(50),
      price DECIMAL(10,2),
      copies_sold INT
  );

  INSERT INTO book (id, title, category, price, copies_sold) VALUES
      (1, 'SQL Basics', 'Programming', 29.99, 1500),
      (2, 'Advanced SQL', 'Programming', 49.99, 2500),
      (3, 'Data Science', 'Data Analysis', 39.99, 2000),
      (4, 'Web Development', 'Programming', 34.99, 1800),
      (5, 'Statistics 101', 'Data Analysis', 24.99, 1200),
      (6, 'Python Basics', 'Programming', 29.99, 3000),
      (7, 'Machine Learning', 'Data Analysis', 44.99, 2200),
      (8, 'Database Design', 'Programming', 34.99, 1700),
      (9, 'R Programming', 'Data Analysis', 34.99, 1600);
  ```
---

The bookstore wants to analyze how books perform compared to other books with similar prices. For each book, they want to see the average sales of books within $5 of its price (i.e. if the book is priced at 20, they want to see the average sales of books priced between 15 and 25).

Given the following data in table `book`:

| id  | title            | category      | price | copies_sold |
| --- | ---------------- | ------------- | ----- | ----------- |
| 1   | SQL Basics       | Programming   | 29.99 | 1500        |
| 2   | Advanced SQL     | Programming   | 49.99 | 2500        |
| 3   | Data Science     | Data Analysis | 39.99 | 2000        |
| 4   | Web Development  | Programming   | 34.99 | 1800        |
| 5   | Statistics 101   | Data Analysis | 24.99 | 1200        |
| 6   | Python Basics    | Programming   | 29.99 | 3000        |
| 7   | Machine Learning | Data Analysis | 44.99 | 2200        |
| 8   | Database Design  | Programming   | 34.99 | 1700        |
| 9   | R Programming    | Data Analysis | 34.99 | 1600        |

Write a query that shows:

- Book title
- Price
- Book's copies sold
- Average copies sold of similarly priced books (within $5 range)
- Number of books in that price range

Order the results by price (ascending) and title (ascending).

## Expected Output

| title            | price | copies_sold | similar_price_avg | books_in_range |
| ---------------- | ----- | ----------- | ----------------- | -------------- |
| Statistics 101   | 24.99 | 1200        | 1900              | 3              |
| Python Basics    | 29.99 | 3000        | 1800              | 6              |
| SQL Basics       | 29.99 | 1500        | 1800              | 6              |
| Database Design  | 34.99 | 1700        | 1933              | 6              |
| R Programming    | 34.99 | 1600        | 1933              | 6              |
| Web Development  | 34.99 | 1800        | 1933              | 6              |
| Data Science     | 39.99 | 2000        | 1860              | 5              |
| Machine Learning | 44.99 | 2200        | 2233              | 3              |
| Advanced SQL     | 49.99 | 2500        | 2350              | 2              |

> **Note:** You can use the `RANGE BETWEEN 5 PRECEDING AND 5 FOLLOWING` clause to create a window that includes all rows where the price is within ±$5 of the current row's price.

## Solution

```sql
SELECT
    title,
    price,
    copies_sold,
    ROUND(AVG(copies_sold) OVER (
        ORDER BY price
        RANGE BETWEEN 5 PRECEDING AND 5 FOLLOWING
    )) as similar_price_avg,
    COUNT(*) OVER (
        ORDER BY price
        RANGE BETWEEN 5 PRECEDING AND 5 FOLLOWING
    ) as books_in_range
FROM book
ORDER BY price, title;
```

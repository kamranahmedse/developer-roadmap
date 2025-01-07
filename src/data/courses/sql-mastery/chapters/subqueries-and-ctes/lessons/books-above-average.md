---
title: Books Above Average
description: Practice using simple subqueries to find books above average price
order: 141
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
      (4, 'Web Development', 'Programming', 34.99, 12),
      (5, 'Statistics 101', 'Data Analysis', 24.99, 15),
      (6, 'Machine Learning', 'Data Analysis', 44.99, 6);
  ```
---

The bookstore manager wants to identify expensive books that might need a price adjustment. They need to find all books that are priced above the average book price.

Given the following data in table `book`:

| id | title           | category      | price | stock |
| -- | --------------- | ------------- | ----- | ----- |
| 1  | SQL Basics      | Programming   | 29.99 | 10    |
| 2  | Advanced SQL    | Programming   | 49.99 | 5     |
| 3  | Data Science    | Data Analysis | 39.99 | 8     |
| 4  | Web Development | Programming   | 34.99 | 12    |
| 5  | Statistics 101  | Data Analysis | 24.99 | 15    |
| 6  | Machine Learning| Data Analysis | 44.99 | 6     |

Write a query that shows:

- Book title
- Category
- Price
- How much the price is above the average (rounded to 2 decimal places)

Only include books that are priced above the average book price and order by price in descending order.

## Expected Output

| title           | category      | price | above_average |
| --------------- | ------------- | ----- | ------------- |
| Advanced SQL    | Programming   | 49.99 | 12.66        |
| Machine Learning| Data Analysis | 44.99 | 7.66         |
| Data Science    | Data Analysis | 39.99 | 2.66         |

> **Note:** The average book price is 37.33

## Solution

```sql
SELECT 
    title,
    category,
    price,
    ROUND(price - (
        SELECT AVG(price)
        FROM book
    ), 2) as above_average
FROM book
WHERE price > (
    SELECT AVG(price)
    FROM book
)
ORDER BY price DESC;
```